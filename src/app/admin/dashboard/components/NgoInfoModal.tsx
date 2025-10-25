import { NgoSubmission } from "@/types/ngo";
import { InfoItem } from "./NgoInfoItem";

export const NgoInfoModal = ({
  ngo,
  onClose,
  onVerify,
  loading,
}: {
  ngo: NgoSubmission | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  loading: boolean;
}) => {
  if (!ngo) return null;

  const getStatusBadge = () => {
    switch (ngo.status) {
      case "active":
        return (
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
            Active
          </span>
        );
      case "suspended":
        return (
          <span className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold">
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
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            Suspended
          </span>
        );
      default:
        return (
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
            Pending Verification
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--primary-color)] text-white p-6 rounded-t-2xl z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{ngo.name}</h2>
              {ngo.tagline && (
                <p className="text-white/90 text-sm italic">"{ngo.tagline}"</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all ml-4"
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
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">
              Current Status
            </span>
            {getStatusBadge()}
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
              <span className="text-2xl">ℹ️</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Organization Type" value={ngo.type} icon="📋" />
              <InfoItem label="Email" value={ngo?.contact?.email} icon="✉️" />
              <InfoItem
                label="Primary Phone"
                value={ngo?.contact?.phone}
                icon="📞"
              />
              {ngo?.contact?.alternatePhone && (
                <InfoItem
                  label="Alternate Phone"
                  value={ngo?.contact?.alternatePhone}
                  icon="📱"
                />
              )}
            </div>
          </div>

          {/* Description */}
          {ngo.description && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
                <span className="text-2xl">📝</span>
                About Organization
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {ngo.description}
                </p>
              </div>
            </div>
          )}

          {/* Address */}
          {(ngo?.address?.street ||
            ngo?.address?.area ||
            ngo?.address?.city ||
            ngo?.address?.state ||
            ngo?.address?.pincode) && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Location
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                <p className="text-sm font-medium text-[var(--text-dark)]">
                  {[
                    ngo?.address?.street,
                    ngo?.address?.area,
                    ngo?.address?.city,
                    ngo?.address?.state,
                    ngo?.address?.pincode,
                    ngo?.address?.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* Social Media */}
          {(ngo.facebook || ngo.instagram || ngo.twitter) && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[var(--text-dark)] flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                Social Media
              </h3>
              <div className="flex flex-wrap gap-3">
                {ngo.facebook && (
                  <a
                    href={ngo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <span className="text-lg">📘</span>
                    Facebook
                  </a>
                )}
                {ngo.instagram && (
                  <a
                    href={ngo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
                  >
                    <span className="text-lg">📸</span>
                    Instagram
                  </a>
                )}
                {ngo.twitter && (
                  <a
                    href={ngo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
                  >
                    <span className="text-lg">🐦</span>
                    Twitter/X
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t-2 border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Close
          </button>
          {ngo.status === "pending_verification" && (
            <button
              onClick={() => onVerify(ngo.id)}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
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
                  Verify & Approve
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
