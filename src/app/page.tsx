import Link from "next/link";
import { getApps } from "firebase/app";
import LandingPage from "@/app/landing/page";
export default function HomePage() {
  const apps = getApps();
  console.log(apps.length > 0 ? "🔥 Firebase is ready" : "❌ Not initialized");
  return (
    <main className="p-6">
      <LandingPage />
    </main>
  );
}
