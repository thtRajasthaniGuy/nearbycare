import Link from "next/link";
import { getApps } from "firebase/app";
export default function HomePage() {
  const apps = getApps();
  console.log(apps.length > 0 ? "🔥 Firebase is ready" : "❌ Not initialized");
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the Admin Dashboard. Manage NGO submissions and data below.
      </p>

      <Link
        href="/user"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Submissions
      </Link>
    </main>
  );
}
