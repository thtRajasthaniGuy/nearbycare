export interface NgoFormValues {
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

export type OrganizationType =
  | "ngo"
  | "orphanage"
  | "senior_centre"
  | "animal_shelter"
  | "educational"
  | "healthcare"
  | "other";

export const ORGANIZATION_TYPES: { value: OrganizationType; label: string }[] =
  [
    { value: "ngo", label: "NGO" },
    { value: "orphanage", label: "Orphanage" },
    { value: "senior_centre", label: "Senior Care Centre" },
    { value: "animal_shelter", label: "Animal Shelter" },
    { value: "educational", label: "Educational Institution" },
    { value: "healthcare", label: "Healthcare Facility" },
    { value: "other", label: "Other" },
  ];

export interface NgoSubmission {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  description?: string;
  tagline?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  status: "pending_verification" | "active" | "suspended";
  createdAt?: any;
  [key: string]: any;
}

// types/ngo.ts

export interface WishlistItem {
  itemId: string;
  item: string;
  quantity: string | null;
  urgency: "low" | "medium" | "high";
  fulfilled: boolean;
}

export interface ContactInfo {
  phone: string;
  alternatePhone: string | null;
  email: string | null;
  website: string | null;
  socialMedia: {
    facebook: string | null;
    instagram: string | null;
    twitter: string | null;
    linkedin: string | null;
  };
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  geohash: string;
}

export interface OperatingHours {
  monday: { open: string; close: string; closed: boolean };
  tuesday: { open: string; close: string; closed: boolean };
  wednesday: { open: string; close: string; closed: boolean };
  thursday: { open: string; close: string; closed: boolean };
  friday: { open: string; close: string; closed: boolean };
  saturday: { open: string; close: string; closed: boolean };
  sunday: { open: string; close: string; closed: boolean };
}

export interface OrganizationImage {
  imageId: string;
  url: string;
  thumbnailUrl: string;
  caption: string | null;
  uploadedAt: any; // Firestore Timestamp
  order: number;
}

export interface VerificationDocument {
  docId: string;
  type: "registration" | "tax_exemption" | "address_proof";
  url: string;
  uploadedAt: any; // Firestore Timestamp
}

export type DonationType = "goods" | "money" | "volunteers" | "services";

export type VerificationBadge = "basic" | "verified" | "premium" | null;

export type OrganizationStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending_verification";

export interface Organization {
  orgId: string;

  // Basic Information
  name: string;
  slug: string;
  type: OrganizationType;
  description: string;
  tagline: string | null;

  // Contact Information
  contact: ContactInfo;

  // Location
  address: Address;
  location: Location;

  // Operational Details
  operatingHours: OperatingHours | null;
  visitingInstructions: string | null;

  // Donation Information
  donationTypes: DonationType[];
  wishlist: WishlistItem[];
  donationInstructions: string | null;

  // Media
  images: OrganizationImage[];
  logo: string | null;

  // Verification & Trust
  verificationBadge: VerificationBadge;
  verificationDocuments: VerificationDocument[];
  lastVerifiedAt: any | null; // Firestore Timestamp
  verifiedBy: string | null;

  // Engagement Metrics
  viewCount: number;
  favoriteCount: number;
  reviewCount: number;
  averageRating: number | null;

  // Status Management
  status: OrganizationStatus;
  suspensionReason: string | null;
  featuredUntil: any | null; // Firestore Timestamp

  // Search Optimization
  searchableKeywords: string[];

  // Ownership
  createdBy: string;
  managedBy: string | null;
  claimedAt: any | null; // Firestore Timestamp

  // Timestamps
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  publishedAt: any | null; // Firestore Timestamp

  // Schema Management
  schemaVersion: number;
}
