import { NGO } from "@/app/searchngo/components/SearchNGOContent";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  where,
  query,
  getDocs,
  limit,
} from "firebase/firestore";

const orgRefName = collection(db, "organizations");
export interface NgoFormData {
  name: string;
  type: string;
  tagline: string;
  description: string;
  phone: string;
  alternatePhone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  latitude: Number;
  longitude: Number;
  place_id: string;
  formatted_address: string;
}

const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const generateKeywords = (data: NgoFormData): string[] => {
  return [
    data.name.toLowerCase(),
    data.city.toLowerCase(),
    data.type,
    data.area.toLowerCase(),
    ...data.name.toLowerCase().split(" "),
  ].filter(Boolean);
};

export const createOrganization = async (
  userId: string,
  formData: NgoFormData,
  userPhotoURL: string | null
) => {
  try {
    const slug = createSlug(formData.name);
    const searchableKeywords = generateKeywords(formData);

    const organizationData = {
      orgId: userId,

      name: formData.name.trim(),
      slug: slug,
      type: formData.type,
      description: formData.description.trim(),
      tagline: formData.tagline.trim() || null,

      contact: {
        phone: formData.phone,
        alternatePhone: formData.alternatePhone || null,
        email: formData.email,
        website: null,
        socialMedia: {
          facebook: formData.facebook || null,
          instagram: formData.instagram || null,
          twitter: formData.twitter || null,
          linkedin: null,
        },
      },

      address: {
        street: formData.street.trim().toLowerCase(),
        area: formData.area.trim().toLowerCase(),
        city: formData.city.trim().toLowerCase(),
        state: formData.state.trim().toLowerCase(),
        pincode: formData.pincode,
        country: formData.country.toLowerCase(),
      },
      location: {
        latitude: formData.latitude,
        longitude: formData.longitude,
        geohash: "",
        place_id: formData.place_id,
        formatted_address: formData.formatted_address,
      },

      operatingHours: null,
      visitingInstructions: null,

      donationTypes: [],
      wishlist: [],
      donationInstructions: null,

      images: [],
      logo: userPhotoURL || null,

      verificationBadge: null,
      verificationDocuments: [],
      lastVerifiedAt: null,
      verifiedBy: null,

      viewCount: 0,
      favoriteCount: 0,
      reviewCount: 0,
      averageRating: null,

      status: "pending_verification",
      suspensionReason: null,
      featuredUntil: null,

      searchableKeywords,

      createdBy: userId,
      managedBy: userId,
      claimedAt: serverTimestamp(),

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: null,

      schemaVersion: 1,
    };

    const orgRef = doc(db, "organizations", userId);
    await setDoc(orgRef, organizationData);

    return { success: true, orgId: userId };
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
};

export const getOrganization = async (userId: string) => {
  try {
    const orgRef = doc(orgRefName, userId);
    const orgDoc = await getDoc(orgRef);

    if (orgDoc.exists()) {
      return {
        id: orgDoc.id,
        ...orgDoc.data(),
      };
    }
    return null;
  } catch (error) {
    console.error("Error getting organization:", error);
    throw error;
  }
};

export const updateOrganization = async (
  userId: string,
  data: Partial<NgoFormData>
) => {
  try {
    const orgRef = doc(db, "organizations", userId);
    await updateDoc(orgRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating organization:", error);
    throw error;
  }
};

export const checkOrganizationExists = async (userId: string) => {
  try {
    const orgRef = doc(db, "organizations", userId);
    const orgDoc = await getDoc(orgRef);
    return orgDoc.exists();
  } catch (error) {
    console.error("Error checking organization:", error);
    throw error;
  }
};

export const getOrganizationByCityName = async (cityName: string) => {
  try {
    const q = query(
      orgRefName,
      where("address.city", "==", cityName.toLowerCase())
    );
    const getOrgs = await getDocs(q);
    const orgs: any[] = [];
    getOrgs.forEach((doc) => {
      orgs.push({ id: doc.id, ...doc.data() });
    });
    return orgs;
  } catch (error) {
    console.error("Error fetching organizations by city:", error);
    return [];
  }
};

export async function getOrganizationBySlug(slug: string): Promise<NGO | null> {
  try {
    const q = query(
      collection(db, "organizations"),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const q2 = query(
        collection(db, "organizations"),
        where("id", "==", slug),
        limit(1)
      );
      const snapshot2 = await getDocs(q2);
      if (snapshot2.empty) return null;
      return snapshot2.docs[0].data() as NGO;
    }

    return snapshot.docs[0].data() as NGO;
  } catch (err) {
    console.error("Error fetching NGO by slug:", err);
    return null;
  }
}
