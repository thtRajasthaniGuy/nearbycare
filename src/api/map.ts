// lib/firebase/organizationSearch.ts
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { geocodeAddress, calculateBoundingBox } from "@/lib/getLocation";

const orgRefName = collection(db, "organizations");

function isSimpleLocation(searchQuery: string): boolean {
  const normalized = searchQuery.toLowerCase().trim();

  const wordCount = normalized.split(/\s+/).length;
  if (wordCount <= 2) {
    return true;
  }

  const addressIndicators = [
    "road",
    "street",
    "avenue",
    "lane",
    "nagar",
    "colony",
    "sector",
    "block",
    "near",
    "behind",
    "opposite",
    "plot",
    "house",
    "building",
    "floor",
    "apartment",
    "flat",
    "villa",
    "complex",
    "society",
    "phase",
    "main",
    "bypass",
    "highway",
    "circle",
    "square",
    "vistar",
    "marg",
    "path",
    "gali",
    "chowk",
  ];

  const hasAddressIndicator = addressIndicators.some((indicator) =>
    normalized.includes(indicator)
  );

  if (hasAddressIndicator) {
    return false;
  }

  if (/\d/.test(normalized)) {
    return false;
  }

  return true;
}

export async function searchOrganizationsByLocation(
  searchQuery: string
): Promise<any[]> {
  try {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    const cityQuery = query(
      orgRefName,
      where("address.city", "==", normalizedQuery)
    );

    const stateQuery = query(
      orgRefName,
      where("address.state", "==", normalizedQuery)
    );

    const [citySnapshot, stateSnapshot] = await Promise.all([
      getDocs(cityQuery),
      getDocs(stateQuery),
    ]);

    const organizations = new Map();

    citySnapshot.forEach((doc) => {
      organizations.set(doc.id, { id: doc.id, ...doc.data() });
    });

    stateSnapshot.forEach((doc) => {
      organizations.set(doc.id, { id: doc.id, ...doc.data() });
    });

    return Array.from(organizations.values());
  } catch (error) {
    console.error("Error searching organizations by location:", error);
    throw new Error("Failed to search organizations by location");
  }
}

export async function searchOrganizationsByAddress(
  searchQuery: string,
  radiusKm: number = 5
): Promise<{
  organizations: any[];
  searchLocation: {
    lat: number;
    lng: number;
    formatted_address: string;
  };
  boundingBox: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
    radius: number;
  };
}> {
  try {
    const location = await geocodeAddress(searchQuery);

    const boundingBox = calculateBoundingBox(
      location.lat,
      location.lng,
      radiusKm
    );

    const latQuery = query(
      orgRefName,
      where("location.latitude", ">=", boundingBox.southwest.lat),
      where("location.latitude", "<=", boundingBox.northeast.lat)
    );

    const snapshot = await getDocs(latQuery);

    const organizations = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      })
      .filter((org: any) => {
        return (
          org.location?.longitude >= boundingBox.southwest.lng &&
          org.location?.longitude <= boundingBox.northeast.lng
        );
      })
      .map((org: any) => {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          org.location.latitude,
          org.location.longitude
        );

        return {
          ...org,
          distance: distance,
          distanceFormatted: formatDistance(distance),
        };
      })
      .filter((org) => org.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);

    return {
      organizations,
      searchLocation: {
        lat: location.lat,
        lng: location.lng,
        formatted_address: location.formatted_address,
      },
      boundingBox,
    };
  } catch (error) {
    console.error("Error searching organizations by address:", error);
    throw new Error("Failed to search organizations by address");
  }
}

export async function smartSearchOrganizations(
  searchQuery: string,
  radiusKm: number = 5
): Promise<{
  type: "city_state" | "address";
  organizations: any[];
  searchLocation?: {
    lat: number;
    lng: number;
    formatted_address: string;
  };
  boundingBox?: {
    northeast: { lat: number; lng: number };
    southwest: { lat: number; lng: number };
    radius: number;
  };
}> {
  try {
    const isSimple = isSimpleLocation(searchQuery);

    if (isSimple) {
      const cityStateResults = await searchOrganizationsByLocation(searchQuery);

      if (cityStateResults.length > 0) {
        return {
          type: "city_state",
          organizations: cityStateResults,
        };
      }
    }

    const addressResults = await searchOrganizationsByAddress(
      searchQuery,
      radiusKm
    );

    return {
      type: "address",
      organizations: addressResults.organizations,
      searchLocation: addressResults.searchLocation,
      boundingBox: addressResults.boundingBox,
    };
  } catch (error) {
    console.error("Error in smart search:", error);
    throw new Error("Failed to search organizations");
  }
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  return `${distanceInKm.toFixed(1)} km`;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
