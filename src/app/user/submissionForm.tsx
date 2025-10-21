"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addSubmissionForNgo } from "@/api/user";
import { userSubmission } from "@/types/userSubmission";
import toast from "react-hot-toast";

interface SubmissionFormProps {
  onSuccess?: () => void;
}

const validationSchema = Yup.object({
  userName: Yup.string().required("Name is required"),
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  ngoName: Yup.string().required("NGO Name is required"),
  ngoEmail: Yup.string().email("Invalid NGO email").optional(),
  ngoPhoneNumber: Yup.string().optional().max(10),
  ngoAddress: Yup.string().required("Address is required"),
  ngoType: Yup.string().required("Please select NGO type"),
});

const SubMissionForm = ({ onSuccess }: SubmissionFormProps) => {
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

  return (
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
      {({ values, handleChange, handleBlur }) => (
        <Form className="flex flex-col gap-4">
          <Field
            name="userName"
            placeholder="Enter your name"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="userName"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="userEmail"
            placeholder="Enter your email"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="userEmail"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="ngoName"
            placeholder="Enter NGO name"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="ngoName"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="ngoEmail"
            placeholder="Enter NGO email"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="ngoEmail"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="ngoPhoneNumber"
            placeholder="Enter NGO phone number"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="ngoPhoneNumber"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="ngoAddress"
            placeholder="Enter NGO address"
            className="border rounded px-3 py-2"
          />
          <ErrorMessage
            name="ngoAddress"
            component="div"
            className="text-red-500 text-sm"
          />

          <select
            id="ngoType"
            name="ngoType"
            value={values.ngoType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded px-3 py-2"
          >
            <option value="" label="Select a type" />
            <option value="environmental" label="Environmental" />
            <option value="educational" label="Educational" />
            <option value="healthcare" label="Healthcare" />
            <option value="animal-welfare" label="Animal Welfare" />
            <option value="human-rights" label="Human Rights" />
          </select>
          <ErrorMessage
            name="ngoType"
            component="div"
            className="text-red-500 text-sm"
          />

          <button
            type="submit"
            disabled={mutation.isPending}
            className={`rounded px-4 py-2 text-white ${
              mutation.isPending
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </button>

          {mutation.isSuccess && (
            <p className="text-green-600 text-sm">Submitted successfully!</p>
          )}

          {mutation.isError && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SubMissionForm;
