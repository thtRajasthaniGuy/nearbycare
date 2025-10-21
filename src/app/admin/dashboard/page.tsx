"use client";

import { useState } from "react";
import SubmissionsTabs from "./components/SubmissionsTabs";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
export default function AdminDashboard() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin");
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <SubmissionsTabs />
      </div>
    </div>
  );
}
