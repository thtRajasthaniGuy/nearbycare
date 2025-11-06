import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

let cachedAdminEmails: string[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getAdminEmails(): Promise<string[]> {
  const now = Date.now();

  if (cachedAdminEmails && now - lastFetchTime < CACHE_DURATION) {
    return cachedAdminEmails;
  }

  try {
    const adminsRef = collection(db, "admins");
    const snapshot = await getDocs(adminsRef);

    const emails = snapshot.docs
      .map((doc) => doc.data().email)
      .filter((email) => typeof email === "string" && email.length > 0);
    console.log("admin email", emails);
    cachedAdminEmails = emails;
    lastFetchTime = now;

    return emails;
  } catch (error) {
    console.error("Error fetching admin emails:", error);

    return cachedAdminEmails || [];
  }
}

export async function isAdminEmail(email: string): Promise<boolean> {
  const adminEmails = await getAdminEmails();
  return adminEmails.includes(email);
}

export function clearAdminCache() {
  cachedAdminEmails = null;
  lastFetchTime = 0;
}
