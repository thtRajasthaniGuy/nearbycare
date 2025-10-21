"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold text-red-600">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-6 py-2 bg-[#F25912] text-white rounded-lg hover:bg-[#412B6B]"
      >
        Try again
      </button>
    </div>
  );
}
