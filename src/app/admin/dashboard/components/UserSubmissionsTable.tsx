"use client";

import { getNgoList, ngoRegistered } from "@/api/user";
import { useEffect, useState } from "react";
import { StatCard } from "./NgoStateCard";
import { UserSubmissionInfo } from "@/types/userSubmission";
import { UserSubmissionModal } from "./UserSubmissionModa";

export default function UserSubmissionsTable() {
  const [submissions, setSubmissions] = useState<UserSubmissionInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<UserSubmissionInfo | null>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setFetchLoading(true);
        const data: any = await getNgoList();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      await ngoRegistered(id);
      // Update local state
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, ngoRegistered: true } : sub
        )
      );
      setSelectedSubmission(null);
      setLoading(false);
    } catch (error) {
      console.error("Error approving submission:", error);
      setLoading(false);
    }
  };

  // Loading State
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
          Loading submissions...
        </p>
      </div>
    );
  }

  const pendingCount = submissions.filter((s) => !s.ngoRegistered).length;
  const approvedCount = submissions.filter((s) => s.ngoRegistered).length;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] p-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">👥</span>
            User Submissions
          </h2>
          <p className="text-white/90 text-sm mt-1">
            NGO recommendations from community members
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-b-2 border-gray-100">
          <StatCard
            label="Total Submissions"
            value={submissions.length}
            icon="📊"
            color="blue"
          />
          <StatCard
            label="Pending Approval"
            value={pendingCount}
            icon="⏳"
            color="yellow"
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            icon="✅"
            color="green"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  NGO Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Submitted By
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Type
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
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-6xl">📭</span>
                      <p className="text-gray-500 font-medium">
                        No submissions yet
                      </p>
                      <p className="text-sm text-gray-400">
                        User submissions will appear here once they recommend
                        NGOs
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🏢</span>
                        <div>
                          <p className="font-semibold text-[var(--text-dark)]">
                            {sub.ngoName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {sub.ngoEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👤</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {sub.userName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {sub.userEmail || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {sub.ngoType || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {sub.ngoRegistered ? (
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
                          Approved
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
                          setSelectedSubmission(sub);
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
      {selectedSubmission && (
        <UserSubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
          onApprove={handleApprove}
          loading={loading}
        />
      )}
    </>
  );
}
