import axios from "axios";

const OLA_MAPS_API_KEY = process.env.NEXT_PUBLIC_OLAMAPS_KEY;

/**
 * Geocode address using Ola Maps API
 * Returns lat/lng coordinates and formatted address
 */
export async function geocodeAddress(address: string): Promise<{
  lat: number;
  lng: number;
  formatted_address: string;
  place_id: string;
}> {
  try {
    const response = await axios.get(
      "https://api.olamaps.io/places/v1/geocode",
      {
        params: {
          address: address.trim(),
          language: "English",
          api_key: OLA_MAPS_API_KEY,
        },
        headers: {
          "X-Request-Id": generateRequestId(),
          "X-Correlation-Id": generateCorrelationId(),
        },
      }
    );

    if (
      response.data.status === "ok" &&
      response.data.geocodingResults?.length > 0
    ) {
      const result = response.data.geocodingResults[0];

      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formatted_address: result.formatted_address,
        place_id: result.place_id,
      };
    }

    throw new Error("Unable to geocode address");
  } catch (error: any) {
    console.error("Ola Maps geocoding error:", error);
    throw new Error(
      error.response?.data?.message || "Unable to geocode address"
    );
  }
}

/**
 * Reverse geocode: Get address from lat/lng coordinates
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{
  formatted_address: string;
  address_components: any[];
}> {
  try {
    const response = await axios.get(
      "https://api.olamaps.io/places/v1/reverse-geocode",
      {
        params: {
          latlng: `${lat},${lng}`,
          language: "English",
          api_key: OLA_MAPS_API_KEY,
        },
        headers: {
          "X-Request-Id": generateRequestId(),
          "X-Correlation-Id": generateCorrelationId(),
        },
      }
    );

    if (response.data.status === "ok" && response.data.results?.length > 0) {
      const result = response.data.results[0];
      return {
        formatted_address: result.formatted_address,
        address_components: result.address_components,
      };
    }

    throw new Error("Unable to reverse geocode coordinates");
  } catch (error: any) {
    console.error("Ola Maps reverse geocoding error:", error);
    throw new Error(
      error.response?.data?.message || "Unable to reverse geocode coordinates"
    );
  }
}

/**
 * Validate coordinates
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180 &&
    lat !== 0 &&
    lng !== 0
  );
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * Uses Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
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

/**
 * Format distance for display
 */
export function formatDistance(distanceInKm: number): string {
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  return `${distanceInKm.toFixed(1)} km`;
}

// Helper functions
function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function generateCorrelationId(): string {
  return `corr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
