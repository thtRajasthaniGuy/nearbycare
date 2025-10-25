"use client";

import { useState } from "react";
import UserSubmissionsTable from "./UserSubmissionsTable";
import NgoSubmissionsTable from "./NgoSubmissionsTable";

export default function SubmissionsTabs() {
  const [activeTab, setActiveTab] = useState<"user" | "ngo">("user");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 inline-flex gap-2">
          <button
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "user"
                ? "bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("user")}
            aria-label="View user submissions"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">👥</span>
              User Submissions
              {activeTab === "user" && (
                <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </span>
          </button>
          <button
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "ngo"
                ? "bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("ngo")}
            aria-label="View NGO submissions"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              NGO Registrations
              {activeTab === "ngo" && (
                <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          {activeTab === "user" ? (
            <UserSubmissionsTable />
          ) : (
            <NgoSubmissionsTable />
          )}
        </div>
      </div>
    </div>
  );
}
