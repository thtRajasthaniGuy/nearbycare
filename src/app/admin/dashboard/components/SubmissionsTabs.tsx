"use client";

import { useState } from "react";
import UserSubmissionsTable from "./UserSubmissionsTable";
import NgoSubmissionsTable from "./NgoSubmissionsTable";

export default function SubmissionsTabs() {
  const [activeTab, setActiveTab] = useState("user");

  return (
    <div>
      <div className="flex gap-4 border-b pb-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("user")}
        >
          User Submissions
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-medium ${
            activeTab === "ngo"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("ngo")}
        >
          NGO Submissions
        </button>
      </div>

      {activeTab === "user" ? (
        <UserSubmissionsTable />
      ) : (
        <NgoSubmissionsTable />
      )}
    </div>
  );
}
