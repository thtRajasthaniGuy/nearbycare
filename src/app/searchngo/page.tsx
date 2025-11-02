import React from "react";
import SearchNGOContent from "./components/SearchNGOContent";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function SearchNGOPage({ searchParams }: PageProps) {
  const locationParam =
    typeof searchParams?.location === "string" ? searchParams.location : "";

  return <SearchNGOContent initialLocation={locationParam} />;
}
