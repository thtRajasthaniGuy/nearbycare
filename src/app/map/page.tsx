"use client";
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapStyleSelector } from "./components/MapStyleSelector";
import { MapControls } from "./components/MapControls";
import { SearchBar } from "./components/SearchBar";
import { NGOInfoCard } from "./components/NGOInfoCard";
import { useDebounce } from "@/hooks/useDebounce";
import { smartSearchOrganizations } from "@/api/map";
import { useInitialNGOs } from "@/hooks/useInitialNGOs";

const CATEGORY_COLORS: any = {
  "Health & Welfare": "#ef4444",
  Environment: "#10b981",
  Education: "#3b82f6",
  "Child Welfare": "#f59e0b",
  "Water & Sanitation": "#06b6d4",
  default: "#f25912",
};

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNGO, setSelectedNGO] = useState<any>(null);
  const { data: initialNGOs, isLoading: isLoadingInitialNGOs } =
    useInitialNGOs();
  const [filteredNGOs, setFilteredNGOs] = useState<any[]>([]);
  const [mapStyle, setMapStyle] = useState(
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  );

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchType, setSearchType] = useState<"city_state" | "address">(
    "city_state"
  );
  const [radius, setRadius] = useState(5);

  const debouncedSearch = useDebounce(searchQuery, 500);
  useEffect(() => {
    if (initialNGOs && initialNGOs.length > 0 && !searchQuery) {
      setFilteredNGOs(initialNGOs);
      if (map.current?.isStyleLoaded()) {
        renderMarkers(initialNGOs);
      }
    }
  }, [initialNGOs]);
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [78.9629, 20.5937],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [78.9629, 20.5937],
      zoom: 5,
      minZoom: 4,
      maxZoom: 18,
    });

    map.current.on("load", () => {
      if (initialNGOs && initialNGOs.length > 0) {
        renderMarkers(initialNGOs);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [initialNGOs, mapStyle]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      performSearch(debouncedSearch);
    } else {
      setSearchResults([]);
      setFilteredNGOs(initialNGOs || []);
      if (map.current?.isStyleLoaded()) {
        renderMarkers(initialNGOs || []);
      }
    }
  }, [debouncedSearch, radius, initialNGOs]);

  const performSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const result = await smartSearchOrganizations(query, radius);
      setSearchResults(result.organizations);
      setSearchType(result.type);

      const ngoData = result.organizations.map((org: any) => ({
        id: org.id,
        name: org.name || "Unnamed Organization",
        category: org.category || "General",
        latitude: org.location?.latitude,
        longitude: org.location?.longitude,
        description: org.description || "",
        volunteers: org.volunteers || 0,
      }));

      setFilteredNGOs(ngoData);

      if (map.current?.isStyleLoaded()) {
        renderMarkers(ngoData);

        if (result.type === "address" && result.searchLocation) {
          map.current?.flyTo({
            center: [result.searchLocation.lng, result.searchLocation.lat],
            zoom: 13,
            duration: 1500,
          });
        } else if (ngoData.length > 0) {
          const bounds = new maplibregl.LngLatBounds();
          ngoData.forEach((ngo: any) => {
            bounds.extend([ngo.longitude, ngo.latitude]);
          });
          map.current?.fitBounds(bounds, { padding: 50, duration: 1500 });
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setFilteredNGOs([]);
    } finally {
      setIsSearching(false);
    }
  };

  const renderMarkers = (ngos: any[]) => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    if (map.current.getSource("ngos")) {
      ["clusters", "cluster-count", "unclustered-point"].forEach((id) => {
        if (map.current!.getLayer(id)) map.current!.removeLayer(id);
      });
      map.current.removeSource("ngos");
    }

    // Filter out invalid coordinates
    const validNGOs = ngos.filter(
      (ngo) =>
        ngo.latitude &&
        ngo.longitude &&
        !isNaN(ngo.latitude) &&
        !isNaN(ngo.longitude)
    );

    // Return early if no valid NGOs
    if (validNGOs.length === 0) return;

    const geojson: any = {
      type: "FeatureCollection",
      features: validNGOs.map((ngo) => ({
        type: "Feature",
        properties: {
          id: ngo.id,
          name: ngo.name,
          category: ngo.category,
          description: ngo.description,
          volunteers: ngo.volunteers,
        },
        geometry: { type: "Point", coordinates: [ngo.longitude, ngo.latitude] },
      })),
    };

    map.current.addSource("ngos", {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });

    map.current.addLayer({
      id: "clusters",
      type: "circle",
      source: "ngos",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#a5b4fc",
          10,
          "#818cf8",
          30,
          "#6366f1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 18, 10, 25, 30, 35],
      },
    });

    map.current.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "ngos",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
      paint: { "text-color": "#fff" },
    });

    map.current.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "ngos",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": [
          "match",
          ["get", "category"],
          "Health & Welfare",
          CATEGORY_COLORS["Health & Welfare"],
          "Environment",
          CATEGORY_COLORS["Environment"],
          "Education",
          CATEGORY_COLORS["Education"],
          "Child Welfare",
          CATEGORY_COLORS["Child Welfare"],
          "Water & Sanitation",
          CATEGORY_COLORS["Water & Sanitation"],
          CATEGORY_COLORS.default,
        ],
        "circle-radius": 10,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
      },
    });

    map.current.on("click", "clusters", (e) => {
      const features = map.current?.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features?.[0]?.properties?.cluster_id;
      if (!clusterId) return;
      (map.current!.getSource("ngos") as any).getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: number) => {
          if (err) return;
          map.current?.easeTo({
            center: (features?.[0]?.geometry as any).coordinates,
            zoom,
          });
        }
      );
    });

    map.current.on("click", "unclustered-point", (e) => {
      const feature = e.features?.[0];
      if (!feature) return;
      const ngo = validNGOs.find((n) => n.id === feature.properties?.id);
      if (ngo) {
        setSelectedNGO(ngo);
        map.current?.flyTo({
          center: [ngo.longitude, ngo.latitude],
          zoom: 12,
          duration: 1000,
        });
      }
    });

    map.current.on("mouseenter", "clusters", () => {
      map.current!.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "clusters", () => {
      map.current!.getCanvas().style.cursor = "";
    });
  };

  const handleZoomIn = () => map.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => map.current?.zoomOut({ duration: 300 });
  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            duration: 1500,
          });
        },
        () => alert("Unable to get your location.")
      );
    }
  };

  return (
    <div className="w-full h-screen relative bg-gray-100">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => {
          setSearchQuery("");
          setSearchResults([]);
          setFilteredNGOs(initialNGOs || []);
          if (map.current?.isStyleLoaded()) {
            renderMarkers(initialNGOs || []);
          }
        }}
        isLoading={isSearching}
        searchType={searchType}
        radius={radius}
        onRadiusChange={setRadius}
        resultsCount={searchResults.length}
      />
      <MapStyleSelector currentStyle={mapStyle} onStyleChange={setMapStyle} />
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onLocate={handleLocate}
      />
      {selectedNGO && (
        <NGOInfoCard
          ngo={selectedNGO}
          categoryColor={
            CATEGORY_COLORS[selectedNGO.category] || CATEGORY_COLORS.default
          }
          onClose={() => setSelectedNGO(null)}
        />
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
