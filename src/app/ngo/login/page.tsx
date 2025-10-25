"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function NgoLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const orgRef = doc(db, "organizations", user.uid);
          const orgDoc = await getDoc(orgRef);

          if (orgDoc.exists()) {
            const data = orgDoc.data();

            if (data.status === "active") {
              router.replace("/ngo/dashboard");
            } else if (data.status === "pending_verification") {
              router.replace("/ngo/onboarding");
            } else {
              setIsChecking(false);
            }
          } else {
            setIsChecking(false);
          }
        } catch (err) {
          console.error("Error checking user:", err);
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setIsLoading(true);

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (!result.user) {
        throw new Error("Authentication failed. Please try again.");
      }

      const orgRef = doc(db, "organizations", result.user.uid);
      const orgDoc = await getDoc(orgRef);

      if (orgDoc.exists()) {
        const data = orgDoc.data();

        if (data.status === "active") {
          router.replace("/ngo/dashboard");
        } else if (data.status === "pending_verification") {
          router.replace("/ngo/onboarding");
        } else if (data.status === "suspended") {
          setError(
            `Account suspended: ${
              data.suspensionReason || "Please contact admin"
            }`
          );
        } else {
          router.replace("/ngo/onboarding");
        }
      } else {
        router.replace("/ngo/onboarding");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-purple-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-[var(--secondary-color)] border-b-transparent rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div>
          <p className="text-[var(--text-dark)] font-medium">
            Loading your session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section with Brand Colors */}
          <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">NGO Portal</h1>
            <p className="text-white/90 text-sm">
              Empowering organizations to make a difference
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-sm">
                Sign in to manage your organization and reach your community
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-200 hover:border-[var(--primary-color)] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:shadow-none text-[var(--text-dark)] font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 group"
              aria-label="Sign in with Google"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="group-hover:text-[var(--primary-color)] transition-colors">
                    Continue with Google
                  </span>
                </>
              )}
            </button>

            {/* Benefits Section */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center mb-4">
                What you can do
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--primary-color)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Showcase your organization's impact
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--primary-color)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Connect with local communities
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--primary-color)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Receive donations and support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-center text-xs text-gray-600 px-4">
          By signing in, you agree to our{" "}
          <button className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium underline-offset-2 hover:underline transition-colors">
            Terms of Service
          </button>{" "}
          and{" "}
          <button className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] font-medium underline-offset-2 hover:underline transition-colors">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
}
