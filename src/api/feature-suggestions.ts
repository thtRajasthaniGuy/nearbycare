import { db } from "@/lib/firebase";
import { Suggestion } from "@/types/feature-suggestion";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const collectionName = collection(db, "suggestions");

export const addSuggestion = async (data: Suggestion) => {
  console.log("suggestion data", data);
  const now = Timestamp.now();
  const docRef = await addDoc(collectionName, {
    ...data,
    createdAt: now,
    updatedAt: now,
    status: "pending", // pending, reviewed, implemented, rejected
  });
  return docRef.id;
};

export const getSuggestionList = async () => {
  const querySnapShot = await getDocs(collectionName);
  let suggestionList: any[] = [];
  querySnapShot.forEach((doc: any) => {
    suggestionList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return suggestionList;
};

export const getSuggestionsByType = async (type: string) => {
  const q = query(collectionName, where("type", "==", type));
  const querySnapShot = await getDocs(q);
  let suggestionList: any[] = [];
  querySnapShot.forEach((doc: any) => {
    suggestionList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return suggestionList;
};

export const getSuggestionsByStatus = async (status: string) => {
  const q = query(collectionName, where("status", "==", status));
  const querySnapShot = await getDocs(q);
  let suggestionList: any[] = [];
  querySnapShot.forEach((doc: any) => {
    suggestionList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return suggestionList;
};

export const updateSuggestionStatus = async (
  id: string,
  status: "pending" | "reviewed" | "implemented" | "rejected"
) => {
  try {
    const now = Timestamp.now();
    await updateDoc(doc(collectionName, id), {
      status: status,
      updatedAt: now,
    });
  } catch (error) {
    return error;
  }
};

export const addAdminNote = async (id: string, note: string) => {
  try {
    const now = Timestamp.now();
    await updateDoc(doc(collectionName, id), {
      adminNote: note,
      updatedAt: now,
    });
  } catch (error) {
    return error;
  }
};
