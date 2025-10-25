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
