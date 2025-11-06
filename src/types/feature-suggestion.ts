import { Timestamp } from "firebase/firestore";

export interface Suggestion {
  type: "feature" | "bug" | "feedback";
  title: string;
  description: string;
  email?: string;
  status?: "pending" | "reviewed" | "implemented" | "rejected";
  adminNote?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SuggestionWithId extends Suggestion {
  id: string;
}
