"use client";
import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapStyleSelector } from "./components/MapStyleSelector";
import { MapControls } from "./components/MapControls";
import { SearchBar } from "./components/SearchBar";
import { NGOInfoCard } from "./components/NGOInfoCard";

const MOCK_NGOS = [
  {
    id: "1",
    name: "Smile Foundation",
    category: "Education",
    latitude: 26.9124,
    longitude: 75.7873,
    description: "Empowering underprivileged children through education",
    volunteers: 245,
  },
  {
    id: "2",
    name: "Goonj",
    category: "Community Development",
    latitude: 26.92,
    longitude: 75.79,
    description: "Bridging the gap between urban surplus and rural needs",
    volunteers: 180,
  },
  {
    id: "3",
    name: "Akshaya Patra",
    category: "Food & Nutrition",
    latitude: 26.905,
    longitude: 75.795,
    description: "Feeding millions of school children across India",
    volunteers: 320,
  },
  {
    id: "4",
    name: "Teach For India",
    category: "Education",
    latitude: 26.918,
    longitude: 75.775,
    description: "Building leadership for educational equity",
    volunteers: 156,
  },
  {
    id: "5",
    name: "CRY - Child Rights",
    category: "Child Welfare",
    latitude: 26.91,
    longitude: 75.8,
    description: "Ensuring a happy childhood for every child",
    volunteers: 198,
  },
  {
    id: "6",
    name: "Helpage India",
    category: "Elder Care",
    latitude: 26.925,
    longitude: 75.78,
    description: "Supporting elderly citizens with care and dignity",
    volunteers: 167,
  },
  {
    id: "7",
    name: "Magic Bus",
    category: "Youth Development",
    latitude: 26.9,
    longitude: 75.792,
    description: "Empowering children and youth through sports",
    volunteers: 203,
  },
];

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
  const [filteredNGOs, setFilteredNGOs] = useState(MOCK_NGOS);
  const [mapStyle, setMapStyle] = useState(
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  );

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
      renderMarkers(MOCK_NGOS);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.setStyle(mapStyle);

    const handleStyleLoad = () => {
      if (map.current?.isStyleLoaded()) {
        renderMarkers(filteredNGOs);
        map.current?.off("styledata", handleStyleLoad);
      }
    };

    map.current.on("styledata", handleStyleLoad);
    return () => {
      map.current?.off("styledata", handleStyleLoad);
    };
  }, [mapStyle]);

  useEffect(() => {
    const filtered = MOCK_NGOS.filter(
      (ngo) =>
        ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ngo.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNGOs(filtered);
    if (map.current?.isStyleLoaded()) renderMarkers(filtered);
  }, [searchQuery]);

  const renderMarkers = (ngos: typeof MOCK_NGOS) => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    if (map.current.getSource("ngos")) {
      ["clusters", "cluster-count", "unclustered-point"].forEach((id) => {
        if (map.current!.getLayer(id)) map.current!.removeLayer(id);
      });
      map.current.removeSource("ngos");
    }

    const geojson: any = {
      type: "FeatureCollection",
      features: ngos.map((ngo) => ({
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
          CATEGORY_COLORS.default, // fallback
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
      const ngo = ngos.find((n) => n.id === feature.properties?.id);
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
        onClear={() => setSearchQuery("")}
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
