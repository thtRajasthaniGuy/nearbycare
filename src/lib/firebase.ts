import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Debug: Log all environment variables that start with NEXT_PUBLIC_FIREBASE
if (typeof window === "undefined") {
  console.log("🔍 Server-side environment variables:");
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith("NEXT_PUBLIC_FIREBASE")) {
      console.log(`${key}: ${process.env[key]?.substring(0, 10)}...`);
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

const isConfigValid =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId;

let app: ReturnType<typeof initializeApp> | undefined | any;
let db: ReturnType<typeof getFirestore> | undefined | any;
let auth: ReturnType<typeof getAuth> | undefined | any;
let storage: ReturnType<typeof getStorage> | undefined | any;

if (isConfigValid) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);

    if (typeof window !== "undefined") {
      try {
        getAnalytics(app);
      } catch (error) {
        console.warn("Analytics skipped:", error);
      }
    }

    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
  }
} else {
  console.error(
    "❌ Firebase config incomplete. Check your .env.local file has these variables:\n" +
      "NEXT_PUBLIC_FIREBASE_API_KEY\n" +
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" +
      "NEXT_PUBLIC_FIREBASE_APP_ID"
  );
}

export { db, auth, storage };
export default app;
