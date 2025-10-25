"use client";

import { useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

interface NgoGuardProps {
  children: ReactNode;
}

type OrgStatus =
  | "loading"
  | "unauthenticated"
  | "new"
  | "pending_verification"
  | "suspended"
  | "inactive"
  | "active";

export default function NgoGuard({ children }: NgoGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<OrgStatus>("loading");
  const [suspensionReason, setSuspensionReason] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname === "/ngo/login") {
      setStatus("unauthenticated");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthenticated");
        router.replace("/ngo/login");
        return;
      }

      await checkOrgStatus(user);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  const checkOrgStatus = async (user: User) => {
    try {
      const orgRef = doc(db, "organizations", user.uid);
      const orgDoc = await getDoc(orgRef);
      console.log("orgDoc", orgDoc);
      if (!orgDoc.exists()) {
        setStatus("new");
        if (pathname !== "/ngo/onboarding") {
          router.replace("/ngo/onboarding");
        }
        return;
      }

      const data = orgDoc.data();
      const orgStatus = data.status || "pending_verification";
      setStatus(orgStatus);
      setSuspensionReason(data.suspensionReason);

      // Route based on status
      if (orgStatus === "active") {
        if (pathname === "/ngo/onboarding" || pathname === "/ngo") {
          router.replace("/ngo/dashboard");
        }
      } else if (orgStatus === "pending_verification" || orgStatus === "new") {
        if (pathname === "/ngo/dashboard") {
          router.replace("/ngo/onboarding");
        }
      }
    } catch (error) {
      console.error("Error checking organization status:", error);
      setStatus("unauthenticated");
      router.replace("/ngo/login");
    }
  };

  if (!mounted) {
    return null;
  }

  if (pathname === "/ngo/login") {
    return <>{children}</>;
  }

  if (
    pathname === "/ngo/onboarding" &&
    (status === "new" ||
      status === "pending_verification" ||
      status === "loading")
  ) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "pending_verification" && pathname !== "/ngo/onboarding") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Application Under Review
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for registering! Your organization profile is currently
            being reviewed by our admin team.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Verification typically takes 24-48 hours.</strong> We'll
              notify you once your organization is approved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Suspended
  if (status === "suspended") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-red-600"
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
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Account Suspended
          </h1>
          <p className="text-gray-600 mb-4">
            Your organization account has been temporarily suspended.
          </p>
          {suspensionReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>Reason:</strong> {suspensionReason}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (status === "inactive") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-gray-500"
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
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Account Inactive
          </h1>
          <p className="text-gray-600 mb-6">
            Your organization account is currently inactive. Contact support to
            reactivate your account.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
