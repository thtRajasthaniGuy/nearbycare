"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function NgoSubmissionsTable() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      const querySnapshot = await getDocs(collection(db, "ngoSubmission"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNgos(data);
    };
    fetchNgos();
  }, []);

  const handleVerify = async (id: string) => {
    await updateDoc(doc(db, "ngoSubmission", id), { verified: true });
    setNgos((prev) =>
      prev.map((s) => (s.id === id ? { ...s, verified: true } : s))
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">NGO Submissions</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">NGO Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map((ngo: any) => (
            <tr key={ngo.id} className="border-t">
              <td className="p-2">{ngo.ngoName}</td>
              <td className="p-2">{ngo.ngoEmail}</td>
              <td className="p-2">{ngo.ngoPhoneNumber}</td>
              <td className="p-2">
                {ngo.verified ? (
                  <span className="text-green-600 font-medium">Verified</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </td>
              <td className="p-2 text-center">
                {!ngo.verified && (
                  <button
                    onClick={() => handleVerify(ngo.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Verify
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
