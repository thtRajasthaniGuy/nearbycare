"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addSubmissionForNgo } from "@/api/user";
import type { userSubmission } from "@/types/userSubmission";
import toast from "react-hot-toast";
import { User, Mail, Building2, Phone, MapPin, Tag, Send } from "lucide-react";
import { motion } from "framer-motion";

interface SubmissionFormProps {
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  ngoName: Yup.string().required("NGO Name is required"),
  ngoEmail: Yup.string().email("Invalid NGO email").optional(),
  ngoPhoneNumber: Yup.string().optional().max(10, "Max 10 characters"),
  ngoAddress: Yup.string().required("Address is required"),
  ngoType: Yup.string().required("Please select NGO type"),
});

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSuccess }) => {
  const mutation = useMutation({
    mutationFn: (values: userSubmission) => addSubmissionForNgo(values),
    onSuccess: () => {
      toast.success("Submission successful!", { duration: 5000 });
      onSuccess?.();
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const baseInputClass =
    "w-full rounded-xl bg-[var(--background)] pl-12 pr-4 py-3 border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent text-[var(--text-dark)]";

  const errorClass = "border-red-300 bg-red-50";

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
      className="bg-white rounded-2xl p-5 sm:p-7 md:p-8 shadow-sm"
      aria-labelledby="submission-heading"
    >
      <header className="mb-6">
        <h3
          id="submission-heading"
          className="text-2xl md:text-3xl font-bold text-[var(--text-dark)] mb-1"
        >
          Recommend an NGO
        </h3>
        <p className="text-sm text-gray-600">
          Help KarunaHub grow its verified network — recommend an organization
          you trust.
        </p>
      </header>

      <Formik
        initialValues={{
          userName: "",
          userEmail: "",
          ngoName: "",
          ngoEmail: "",
          ngoPhoneNumber: "",
          ngoAddress: "",
          ngoType: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          mutation.mutate(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[var(--secondary-color)] uppercase tracking-wider">
                Your Information
              </h4>

              <div>
                <label
                  htmlFor="userName"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    id="userName"
                    name="userName"
                    placeholder="Your full name"
                    className={`${baseInputClass} ${
                      errors.userName && touched.userName
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.userName && touched.userName)}
                    aria-describedby={
                      errors.userName && touched.userName
                        ? "userName-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="userName"
                  component="p"
                  id="userName-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    placeholder="you@example.com"
                    className={`${baseInputClass} ${
                      errors.userEmail && touched.userEmail
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.userEmail && touched.userEmail)}
                    aria-describedby={
                      errors.userEmail && touched.userEmail
                        ? "userEmail-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="userEmail"
                  component="p"
                  id="userEmail-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-[var(--secondary-color)] uppercase tracking-wider">
                NGO Information
              </h4>

              <div>
                <label
                  htmlFor="ngoName"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  NGO name
                </label>
                <div className="relative">
                  <Building2
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    id="ngoName"
                    name="ngoName"
                    placeholder="NGO name"
                    className={`${baseInputClass} ${
                      errors.ngoName && touched.ngoName
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.ngoName && touched.ngoName)}
                    aria-describedby={
                      errors.ngoName && touched.ngoName
                        ? "ngoName-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="ngoName"
                  component="p"
                  id="ngoName-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="ngoEmail"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  NGO email (optional)
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    id="ngoEmail"
                    name="ngoEmail"
                    type="email"
                    placeholder="contact@ngo.org"
                    className={`${baseInputClass} ${
                      errors.ngoEmail && touched.ngoEmail
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.ngoEmail && touched.ngoEmail)}
                    aria-describedby={
                      errors.ngoEmail && touched.ngoEmail
                        ? "ngoEmail-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="ngoEmail"
                  component="p"
                  id="ngoEmail-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="ngoPhoneNumber"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  Phone (optional)
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    id="ngoPhoneNumber"
                    name="ngoPhoneNumber"
                    placeholder="1234567890"
                    className={`${baseInputClass} ${
                      errors.ngoPhoneNumber && touched.ngoPhoneNumber
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={
                      !!(errors.ngoPhoneNumber && touched.ngoPhoneNumber)
                    }
                    aria-describedby={
                      errors.ngoPhoneNumber && touched.ngoPhoneNumber
                        ? "ngoPhoneNumber-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="ngoPhoneNumber"
                  component="p"
                  id="ngoPhoneNumber-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="ngoAddress"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  Full address
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-3 text-gray-400"
                    aria-hidden
                  />
                  <Field
                    as="textarea"
                    id="ngoAddress"
                    name="ngoAddress"
                    placeholder="Street, City, State / Province, Postal code"
                    rows={3}
                    className={`${baseInputClass} resize-none pt-3 ${
                      errors.ngoAddress && touched.ngoAddress
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.ngoAddress && touched.ngoAddress)}
                    aria-describedby={
                      errors.ngoAddress && touched.ngoAddress
                        ? "ngoAddress-error"
                        : undefined
                    }
                  />
                </div>
                <ErrorMessage
                  name="ngoAddress"
                  component="p"
                  id="ngoAddress-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="ngoType"
                  className="block text-xs font-medium mb-1 text-[var(--text-dark)]"
                >
                  NGO type
                </label>
                <div className="relative">
                  <Tag
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    aria-hidden
                  />
                  <select
                    id="ngoType"
                    name="ngoType"
                    value={values.ngoType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${baseInputClass} appearance-none cursor-pointer ${
                      errors.ngoType && touched.ngoType
                        ? errorClass + " border-red-300"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    aria-invalid={!!(errors.ngoType && touched.ngoType)}
                    aria-describedby={
                      errors.ngoType && touched.ngoType
                        ? "ngoType-error"
                        : undefined
                    }
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.2rem",
                    }}
                  >
                    <option value="">Select NGO type</option>
                    <option value="environmental">Environmental</option>
                    <option value="educational">Educational</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="animal-welfare">Animal Welfare</option>
                    <option value="human-rights">Human Rights</option>
                  </select>
                </div>
                <ErrorMessage
                  name="ngoType"
                  component="p"
                  id="ngoType-error"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: mutation.isPending
                    ? "#9ca3af"
                    : "linear-gradient(90deg, var(--primary-color) 0%, rgba(242,89,18,0.9) 100%)",
                }}
                aria-live="polite"
              >
                {mutation.isPending ? (
                  <>
                    <span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden
                    />
                    <span className="text-sm">Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden />
                    <span className="text-sm">Submit Recommendation</span>
                  </>
                )}
              </button>

              {mutation.isSuccess && (
                <div
                  className="p-3 bg-green-50 border-2 border-green-200 rounded-xl"
                  role="status"
                >
                  <p className="text-green-700 text-center text-sm font-medium">
                    ✓ Submitted successfully! Thank you.
                  </p>
                </div>
              )}

              {mutation.isError && (
                <div
                  className="p-3 bg-red-50 border-2 border-red-200 rounded-xl"
                  role="alert"
                >
                  <p className="text-red-700 text-center text-sm font-medium">
                    ✗ Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </motion.section>
  );
};

export default SubmissionForm;
