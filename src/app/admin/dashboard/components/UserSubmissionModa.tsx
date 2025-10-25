import { UserSubmissionInfo } from "@/types/userSubmission";
import { InfoItem } from "./NgoInfoItem";

export const UserSubmissionModal = ({
  submission,
  onClose,
  onApprove,
  loading,
}: {
  submission: UserSubmissionInfo | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  loading: boolean;
}) => {
  if (!submission) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{submission.ngoName}</h2>
              <p className="text-white/90 text-sm">Submission Details</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">Status</span>
            {submission.ngoRegistered ? (
              <span className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                <svg
                  className="w-5 h-5"
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
              <span className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                <svg
                  className="w-5 h-5"
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
                Pending Approval
              </span>
            )}
          </div>

          {/* NGO Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
              <span className="text-2xl">🏢</span>
              NGO Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem
                label="Organization Name"
                value={submission.ngoName}
                icon="🏷️"
              />
              <InfoItem
                label="Type"
                value={submission.ngoType || "Not specified"}
                icon="📋"
              />
              <InfoItem label="Email" value={submission.ngoEmail} icon="✉️" />
              <InfoItem
                label="Phone"
                value={submission.ngoPhoneNumber || "Not provided"}
                icon="📞"
              />
            </div>
            <InfoItem
              label="Address"
              value={submission.ngoAddress || "Not provided"}
              icon="📍"
              fullWidth
            />
          </div>

          {/* Submitter Information */}
          <div className="space-y-4 pt-4 border-t-2 border-gray-100">
            <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Submitted By
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Name" value={submission.userName} icon="👤" />
              <InfoItem
                label="Email"
                value={submission.userEmail || "Not provided"}
                icon="✉️"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t-2 border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Close
          </button>
          {!submission.ngoRegistered && (
            <button
              onClick={() => onApprove(submission.id)}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Approving...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
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
                  Approve Submission
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
