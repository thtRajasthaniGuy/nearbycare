import React from "react";

export default function PendingVerification() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-purple-50 to-white px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg text-center border border-gray-100">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <svg
              className="w-12 h-12 text-[var(--primary-color)]"
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
        <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-4">
          Application Under Review
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for registering! Your organization profile is currently
          being reviewed by our admin team.
        </p>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-yellow-800 text-left">
              <strong className="font-semibold">
                Verification typically takes 24-48 hours.
              </strong>
              <br />
              We'll notify you via email once your organization is approved.
            </p>
          </div>
        </div>
        <div className="space-y-3 text-left bg-gray-50 rounded-xl p-5">
          <h3 className="font-semibold text-[var(--text-dark)] mb-3">
            What happens next?
          </h3>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <p className="text-sm text-gray-600">
              Our team reviews your application details
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <p className="text-sm text-gray-600">
              You'll receive an email notification upon approval
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <p className="text-sm text-gray-600">
              Access your dashboard and start making an impact!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
