import { Timestamp } from "firebase/firestore";

export interface userSubmission {
  uid?: string; // Firestore auto-generated
  userName: string;
  userEmail?: string;
  ngoName: string;
  ngoEmail?: string;
  ngoPhoneNumber?: string;
  ngoAddress: string;
  ngoType?: string;
  ngoRegistered?: boolean; // default false
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
