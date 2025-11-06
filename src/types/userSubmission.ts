import { Timestamp } from "firebase/firestore";

export interface userSubmission {
  uid?: string;
  userName: string;
  userEmail?: string;
  ngoName: string;
  ngoEmail?: string;
  ngoPhoneNumber?: string;
  ngoAddress: string;
  ngoType?: string;
  ngoRegistered?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface UserSubmissionInfo {
  id: string;
  userName: string;
  userEmail?: string;
  ngoName: string;
  ngoEmail: string;
  ngoPhoneNumber?: string;
  ngoAddress?: string;
  ngoType?: string;
  ngoRegistered: boolean;
  createdAt?: any;
  [key: string]: any;
}
