import React from "react";
import { FormikProps } from "formik";
import { NgoFormValues } from "../../../types/ngo";
import { ORGANIZATION_TYPES } from "../../../types/ngo";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";

interface StepOneProps {
  formik: FormikProps<NgoFormValues>;
}

export default function StepOne({ formik }: StepOneProps) {
  return (
    <div className="space-y-6">
      <FormInput
        id="name"
        name="name"
        label="Organization Name"
        required
        placeholder="E.g., Akshaya Patra Foundation"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.name}
        touched={formik.touched.name}
      />

      <FormSelect
        id="type"
        name="type"
        label="Organization Type"
        required
        placeholder="Select Type"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.type}
        touched={formik.touched.type}
        options={ORGANIZATION_TYPES}
      />

      <FormInput
        id="tagline"
        name="tagline"
        label="Tagline (Optional)"
        placeholder="A short, catchy description"
        maxLength={150}
        value={formik.values.tagline}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.tagline}
        touched={formik.touched.tagline}
      />
      {formik.values.tagline && (
        <p className="text-xs text-gray-500 -mt-4 ml-1">
          {formik.values.tagline.length}/150 characters
        </p>
      )}

      <FormTextarea
        id="description"
        name="description"
        label="Description"
        required
        placeholder="Describe your organization's mission, activities, and impact..."
        rows={6}
        maxLength={2000}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.description}
        touched={formik.touched.description}
        showCharCount
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          id="phone"
          name="phone"
          label="Primary Phone"
          type="tel"
          required
          placeholder="9876543210"
          maxLength={10}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <FormInput
          id="alternatePhone"
          name="alternatePhone"
          label="Alternate Phone"
          type="tel"
          placeholder="9876543210"
          maxLength={10}
          value={formik.values.alternatePhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.alternatePhone}
          touched={formik.touched.alternatePhone}
        />
      </div>

      <FormInput
        id="email"
        name="email"
        label="Email Address"
        type="email"
        required
        placeholder="contact@organization.org"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.email}
        touched={formik.touched.email}
      />
    </div>
  );
}
