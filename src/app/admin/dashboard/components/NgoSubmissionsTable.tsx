"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { NgoSubmission } from "@/types/ngo";
import { NgoInfoModal } from "./NgoInfoModal";
import { StatCard } from "./NgoStateCard";

export default function NgoSubmissionsTable() {
  const [ngos, setNgos] = useState<NgoSubmission[]>([]);
  const [selectedNgo, setSelectedNgo] = useState<NgoSubmission | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        setFetchLoading(true);
        const querySnapshot = await getDocs(collection(db, "organizations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NgoSubmission[];
        setNgos(data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchNgos();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, "organizations", id), { status: "active" });
      // Update local state
      setNgos((prev) =>
        prev.map((ngo) => (ngo.id === id ? { ...ngo, status: "active" } : ngo))
      );
      setSelectedNgo(null);
      setLoading(false);
    } catch (error) {
      console.error("Error verifying NGO:", error);
      setLoading(false);
    }
  };

  const getOrgTypeDisplay = (type: string) => {
    const types: { [key: string]: string } = {
      ngo: "🤝 NGO",
      orphanage: "👶 Orphanage",
      senior_centre: "👴 Senior Care",
      animal_shelter: "🐾 Animal Shelter",
      educational: "📚 Educational",
      healthcare: "🏥 Healthcare",
      other: "🌟 Other",
    };
    return types[type] || type;
  };

  if (fetchLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-[var(--secondary-color)] border-b-transparent rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
        </div>
        <p className="mt-4 text-[var(--text-dark)] font-medium">
          Loading registrations...
        </p>
      </div>
    );
  }

  const pendingCount = ngos.filter(
    (n) => n.status === "pending_verification"
  ).length;
  const activeCount = ngos.filter((n) => n.status === "active").length;
  const suspendedCount = ngos.filter((n) => n.status === "suspended").length;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">🏢</span>
            NGO Registrations
          </h2>
          <p className="text-white/90 text-sm mt-1">
            Organizations registered directly through the platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b-2 border-gray-100">
          <StatCard
            label="Total Organizations"
            value={ngos.length}
            icon="📊"
            color="blue"
          />
          <StatCard
            label="Pending Verification"
            value={pendingCount}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            label="Active"
            value={activeCount}
            icon="✅"
            color="green"
          />
          <StatCard
            label="Suspended"
            value={suspendedCount}
            icon="🚫"
            color="red"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ngos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-6xl">🏢</span>
                      <p className="text-gray-500 font-medium">
                        No registrations yet
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                ngos.map((ngo) => (
                  <tr
                    key={ngo.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedNgo(ngo)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-0.5">🏢</span>
                        <div>
                          <p className="font-semibold text-[var(--text-dark)]">
                            {ngo.name}
                          </p>
                          {ngo.tagline && (
                            <p className="text-xs text-gray-500 italic mt-0.5">
                              "{ngo.tagline}"
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {getOrgTypeDisplay(ngo.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {ngo?.contact?.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ngo?.contact?.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">
                        {ngo?.address?.city && ngo?.address?.state
                          ? `${ngo?.address?.street},${ngo?.address?.area},${ngo?.address?.city}, ${ngo?.address?.state},${ngo?.address?.pincode}`
                          : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {ngo.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Active
                        </span>
                      ) : ngo.status === "suspended" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                          Suspended
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedNgo(ngo);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedNgo && (
        <NgoInfoModal
          ngo={selectedNgo}
          onClose={() => setSelectedNgo(null)}
          onVerify={handleVerify}
          loading={loading}
        />
      )}
    </>
  );
}
