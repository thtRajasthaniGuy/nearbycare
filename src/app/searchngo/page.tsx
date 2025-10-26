import React from "react";
import SearchNGOContent from "./components/SearchNGOContent";
import { getOrganizationByCityName } from "@/api/ngo";
const mockNGOs = [
  {
    id: "1",
    name: "Smile Foundation",
    category: "Education",
    description:
      "Working towards education and welfare of underprivileged children across India",
    location: "Jaipur, Rajasthan",
    address: "Vaishali Nagar, Jaipur, Rajasthan, 302021",
    phone: "+91 98765 43210",
    email: "contact@smilefoundation.org",
    website: "www.smilefoundation.org",
    verified: true,
    distance: "2.5 km",
  },
  {
    id: "2",
    name: "Akshaya Patra Foundation",
    category: "Food & Nutrition",
    description:
      "Providing mid-day meals to school children and fighting hunger",
    location: "Jaipur, Rajasthan",
    address: "Malviya Nagar, Jaipur, Rajasthan, 302017",
    phone: "+91 98765 43211",
    email: "info@akshayapatra.org",
    website: "www.akshayapatra.org",
    verified: true,
    distance: "4.1 km",
  },
  {
    id: "3",
    name: "Goonj",
    category: "Disaster Relief",
    description: "Turning urban waste into rural development resource",
    location: "Jaipur, Rajasthan",
    address: "C-Scheme, Jaipur, Rajasthan, 302001",
    phone: "+91 98765 43212",
    email: "contact@goonj.org",
    website: "www.goonj.org",
    verified: true,
    distance: "5.8 km",
  },
];
interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SearchNGOPage({ searchParams }: PageProps) {
  const locationParam =
    typeof searchParams?.location === "string" ? searchParams.location : "";

  return <SearchNGOContent initialLocation={locationParam} />;
}
