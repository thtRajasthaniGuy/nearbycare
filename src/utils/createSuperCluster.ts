import Supercluster from "supercluster";

// example - in utils/createSuperCluster.ts
export function createSupercluster(points: any) {
  const features = points.map((p: any) => ({
    type: "Feature",
    properties: {
      id: p.id,
      name: p.name,
      category: p.category,
      // include the original object too (handy)
      original: p,
    },
    geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
  }));

  const index = new Supercluster({ radius: 60, maxZoom: 16 });
  index.load(features);
  return index;
}
