import { Suspense } from "react";
import SubmissionModal from "./submission-modal";
import SkeletionSubmission from "@/components/Skeleton";

const UserSubmissionPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">NGO Submissions</h1>
      <Suspense fallback={<SkeletionSubmission />}>
        <SubmissionModal />
      </Suspense>
    </div>
  );
};

export default UserSubmissionPage;
