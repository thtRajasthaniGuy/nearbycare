export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-[#412B6B] mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-[#F25912] text-white rounded-lg hover:bg-[#5C3E94] transition"
      >
        Go back home
      </a>
    </div>
  );
}
