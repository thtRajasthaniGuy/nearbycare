import React from "react";
import { FormikProps } from "formik";
import { NgoFormValues } from "../../../types/ngo";
import FormInput from "./FormInput";

interface StepTwoProps {
  formik: FormikProps<NgoFormValues>;
}

export default function StepTwo({ formik }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <FormInput
        id="street"
        name="street"
        label="Street Address"
        required
        placeholder="Building/House number and street name"
        value={formik.values.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.street}
        touched={formik.touched.street}
      />

      <FormInput
        id="area"
        name="area"
        label="Area/Locality"
        required
        placeholder="Locality or neighborhood"
        value={formik.values.area}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.area}
        touched={formik.touched.area}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          id="city"
          name="city"
          label="City"
          required
          placeholder="Jaipur"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.city}
          touched={formik.touched.city}
        />

        <FormInput
          id="state"
          name="state"
          label="State"
          required
          placeholder="Rajasthan"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.state}
          touched={formik.touched.state}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          id="pincode"
          name="pincode"
          label="Pincode"
          required
          placeholder="302001"
          maxLength={6}
          value={formik.values.pincode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.pincode}
          touched={formik.touched.pincode}
        />

        <FormInput
          id="country"
          name="country"
          label="Country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled
        />
      </div>
    </div>
  );
}
