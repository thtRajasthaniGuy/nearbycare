import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

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

// Create slug from organization name
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// Generate searchable keywords
const generateKeywords = (data: NgoFormData): string[] => {
  return [
    data.name.toLowerCase(),
    data.city.toLowerCase(),
    data.type,
    data.area.toLowerCase(),
    ...data.name.toLowerCase().split(" "),
  ].filter(Boolean);
};

// Create new organization
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

      // Basic Information
      name: formData.name.trim(),
      slug: slug,
      type: formData.type,
      description: formData.description.trim(),
      tagline: formData.tagline.trim() || null,

      // Contact Information
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

      // Location
      address: {
        street: formData.street.trim(),
        area: formData.area.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode,
        country: formData.country,
      },
      location: {
        latitude: formData.latitude,
        longitude: formData.longitude,
        geohash: "",
        place_id: formData.place_id,
        formatted_address: formData.formatted_address,
      },

      // Operational Details
      operatingHours: null,
      visitingInstructions: null,

      // Donation Information
      donationTypes: [],
      wishlist: [],
      donationInstructions: null,

      // Media
      images: [],
      logo: userPhotoURL || null,

      // Verification & Trust

      verificationBadge: null,
      verificationDocuments: [],
      lastVerifiedAt: null,
      verifiedBy: null,

      // Engagement Metrics
      viewCount: 0,
      favoriteCount: 0,
      reviewCount: 0,
      averageRating: null,

      // Status Management
      status: "pending_verification",
      suspensionReason: null,
      featuredUntil: null,

      // Search Optimization
      searchableKeywords,

      // Ownership
      createdBy: userId,
      managedBy: userId,
      claimedAt: serverTimestamp(),

      // Timestamps
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: null,

      // Schema Management
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

// Get organization by user ID
export const getOrganization = async (userId: string) => {
  try {
    const orgRef = doc(db, "organizations", userId);
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

// Update organization
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

// Check if organization exists
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
