"use client";

import { getNgoList, ngoRegistered } from "@/api/user";
import { useEffect, useState } from "react";

export default function UserSubmissionsTable() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const data: any = await getNgoList();
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      setLoading(true);
      await ngoRegistered(id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Submissions</h2>
      <table className="w-full border">
        <thead className="bg-white-100">
          <tr>
            <th className="border p-2 text-left">Submited By</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Ngo Name</th>
            <th className="border p-2 text-left">Ngo Email </th>
            <th className="border p-2 text-left">Ngo Phone Number</th>
            <th className="border p-2 text-center">Ngo Address</th>
            <th className="border p-2 text-center">Ngo Type</th>
            <th className="border p-2 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub: any) => (
            <tr key={sub.id} className="border-t">
              <td className="p-2">{sub.userName}</td>
              <td className="p-2">{sub.userEmail || "N/A"}</td>
              <td className="p-2">{sub.ngoName}</td>
              <td className="p-2">{sub.ngoEmail}</td>
              <td className="p-2">{sub.ngoPhoneNumber || "N/A"}</td>
              <td className="p-2">{sub.ngoAddress || "N/A"}</td>
              <td className="p-2">{sub.ngoType || "N/A"}</td>
              <td className="p-2">
                {sub.ngoRegistered ? (
                  <span className="text-green-600 font-medium bg-primary ">
                    Approved
                  </span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </td>
              <td className="p-2 text-center">
                {!sub.ngoRegistered && (
                  <button
                    onClick={() => handleApprove(sub.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
