// lib/firebaseAuth.ts
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error("Google login failed:", err);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};
