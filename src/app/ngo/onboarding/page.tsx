"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { useFormik } from "formik";
import { createOrganization, getOrganization } from "@/api/ngo";
import { ngoValidationSchema, STEP_FIELDS } from "@/lib/ngoSchema";
import { NgoFormValues } from "@/types/ngo";
import ProgressBar from "../components/ProgressBar";
import StepHeader from "../components/StepHeader";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import FormNavigation from "../components/FormNavigation";
import PendingVerification from "../components/PendingVerification";
import toast from "react-hot-toast";

const TOTAL_STEPS = 3;

export default function NgoOnboardingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [orgStatus, setOrgStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const org: any = await getOrganization(currentUser.uid);
          if (org) {
            setOrgStatus(org?.status);
            if (org?.status === "active") {
              router.replace("/ngo/dashboard");
            }
          }
        } catch (err) {
          console.error("Error checking organization:", err);
        }
        setIsLoading(false);
      } else {
        router.replace("/ngo/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const formik = useFormik<NgoFormValues>({
    initialValues: {
      name: "",
      type: "",
      tagline: "",
      description: "",
      phone: "",
      alternatePhone: "",
      email: "",
      facebook: "",
      instagram: "",
      twitter: "",
      street: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    validationSchema: ngoValidationSchema,
    onSubmit: async (values) => {
      if (!user) {
        setError("User not authenticated");
        toast.error("User not authenticated");
        return;
      }
      try {
        setError("");
        await createOrganization(user.uid, values, user.photoURL);
        toast.success("Application submitted successfully! Redirecting...");

        setTimeout(() => {
          router.replace("/");
        }, 1500);
      } catch (err) {
        console.error("Submission error:", err);
        const errorMessage = "Failed to submit form. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    },
  });

  useEffect(() => {
    if (user?.email && !formik.values.email) {
      formik.setFieldValue("email", user.email);
    }
  }, [user]);

  const validateStep = async (step: number) => {
    const errors = await formik.validateForm();
    const stepFields = STEP_FIELDS[step as keyof typeof STEP_FIELDS];
    const hasStepErrors = stepFields.some(
      (field) => errors[field as keyof typeof errors]
    );
    if (hasStepErrors) {
      stepFields.forEach((field) => formik.setFieldTouched(field, true));
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(TOTAL_STEPS, prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const isValid = await validateStep(2);
    if (isValid) {
      formik.handleSubmit();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[var(--primary-color)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-[var(--text-dark)] font-semibold">Loading...</p>
      </div>
    );
  }

  if (orgStatus === "pending_verification") {
    return <PendingVerification />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-gray-100">
          <StepHeader currentStep={currentStep} />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-start gap-3 animate-in fade-in duration-200">
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && <StepOne formik={formik} />}
            {currentStep === 2 && <StepTwo formik={formik} />}
            {currentStep === 3 && <StepThree formik={formik} />}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={TOTAL_STEPS}
              isSubmitting={formik.isSubmitting}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </form>

          <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-[var(--primary-color)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Your application will be reviewed within{" "}
              <span className="font-semibold text-[var(--text-dark)]">
                24-48 hours
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
