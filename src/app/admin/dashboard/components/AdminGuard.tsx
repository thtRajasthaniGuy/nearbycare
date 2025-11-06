"use client";

import { ReactNode, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { isAdminEmail } from "@/lib/adminAuth";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email) {
        const isAdmin = await isAdminEmail(firebaseUser.email);
        if (isAdmin) {
          setUser(firebaseUser);
        } else {
          await auth.signOut();
          router.replace("/admin/login?error=unauthorized");
        }
      } else {
        router.replace("/admin/login");
      }
      setChecked(true);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") return null;

  return <>{children}</>;
}
