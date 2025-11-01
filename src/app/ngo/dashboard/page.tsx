"use client";

import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import WishlistSection from "../components/WishlistSection";
import ImageUploadSection from "../components/ImageUploadSection";
import { Package, LogOut, Loader2, Image, List } from "lucide-react";

type TabType = "wishlist" | "images";

export default function NgoDashboardPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("wishlist");
  const router = useRouter();
  const user = auth.currentUser;

  const { data: organization, isLoading: isLoadingOrg } = useQuery({
    queryKey: ["userOrganization", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return null;

      const orgsRef = collection(db, "organizations");
      const q = query(orgsRef, where("managedBy", "==", user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const orgDoc = snapshot.docs[0];
        return { id: orgDoc.id, ...orgDoc.data() };
      }
      return null;
    },
    enabled: !!user?.uid,
  });

  useEffect(() => {
    if (organization?.id) {
      setOrgId(organization.id);
    }
  }, [organization]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      router.replace("/ngo/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-dark)]">
                  NGO Portal
                </h2>
                {organization?.name && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    {organization.name}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  Logout
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-16 h-16 rounded-full ring-4 ring-[var(--primary-color)]/10"
              />
            )}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)]">
                Welcome back{user?.displayName ? `, ${user.displayName}` : ""}!
                🎉
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your organization's needs and showcase your work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-700 bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 rounded-lg border border-green-200">
            <svg
              className="w-5 h-5 flex-shrink-0"
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
            <span className="font-semibold">Status: Approved</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoadingOrg ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[var(--primary-color)] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading your organization...</p>
            </div>
          </div>
        ) : !orgId ? (
          /* No Organization State */
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h3 className="text-yellow-900 font-semibold mb-1">
                  No Organization Found
                </h3>
                <p className="text-yellow-800 text-sm">
                  Your account is not linked to any organization. Please contact
                  support to get your organization set up.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Tabs & Content */
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-sm p-2 mb-8">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === "wishlist"
                      ? "bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-5 h-5" />
                  <span className="hidden sm:inline">Needs & Wishlist</span>
                  <span className="sm:hidden">Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab("images")}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === "images"
                      ? "bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Image className="w-5 h-5" />
                  <span className="hidden sm:inline">Organization Photos</span>
                  <span className="sm:hidden">Photos</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="transition-all duration-300">
              {activeTab === "wishlist" && <WishlistSection orgId={orgId} />}
              {activeTab === "images" && <ImageUploadSection orgId={orgId} />}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
