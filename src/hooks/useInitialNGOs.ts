import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, query, where, limit, getDocs } from "firebase/firestore";

export function useInitialNGOs() {
  return useQuery({
    queryKey: ["initial-ngos"],
    queryFn: async () => {
      const cities = ["jaipur", "delhi", "mumbai", "bangalore"];
      const orgRef = collection(db, "organizations");

      const allNGOs = await Promise.all(
        cities.map(async (city) => {
          const q = query(orgRef, where("address.city", "==", city), limit(3));
          const snapshot = await getDocs(q);

          return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || "Unnamed Organization",
              category: data.category || "General",
              latitude: data.location?.latitude,
              longitude: data.location?.longitude,
              description: data.description || "",
              volunteers: data.volunteers || 0,
            };
          });
        })
      );

      return allNGOs.flat();
    },
    staleTime: 10 * 60 * 1000,
  });
}
