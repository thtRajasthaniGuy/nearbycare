import { db } from "@/lib/firebase";
import { userSubmission } from "@/types/userSubmission";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const collectionName = collection(db, "userSubmission");
export const addSubmissionForNgo = async (data: userSubmission) => {
  const now = Timestamp.now();
  const docRef = await addDoc(collectionName, {
    ...data,
    createdAt: now,
    updatedAt: now,
    ngoRegistered: false,
  });
  docRef.id;
};

export const getNgoList = async () => {
  const querySnapShot = await getDocs(collectionName);
  let ngoList: any[] = [];
  querySnapShot.forEach((doc: any) => {
    ngoList.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return ngoList;
};

export const ngoRegistered = async (id: string) => {
  try {
    await updateDoc(doc(collectionName, id), { ngoRegistered: true });
  } catch (error) {
    return error;
  }
};
