"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { isAdminEmail } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userChecked, setUserChecked] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for unauthorized error from guard
    if (searchParams.get("error") === "unauthorized") {
      setError("You are not authorized to access the admin panel.");
      setUserChecked(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        const isAdmin = await isAdminEmail(firebaseUser.email);
        if (isAdmin) {
          router.replace("/admin/dashboard");
        } else {
          await auth.signOut();
          setError("You are not authorized to access the admin panel.");
          setUserChecked(true);
        }
      } else {
        setUserChecked(true);
      }
    });

    return () => unsubscribe();
  }, [router, searchParams]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user.email) {
        const isAdmin = await isAdminEmail(result.user.email);
        if (isAdmin) {
          router.replace("/admin/dashboard");
        } else {
          await auth.signOut();
          setError("You are not authorized to access the admin panel.");
        }
      } else {
        await auth.signOut();
        setError("Unable to retrieve email from Google account.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Admin Login
        </h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
