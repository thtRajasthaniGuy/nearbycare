import * as Yup from "yup";

export const ngoValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name is too long")
    .required("Organization name is required"),
  type: Yup.string()
    .oneOf([
      "ngo",
      "orphanage",
      "senior_centre",
      "animal_shelter",
      "educational",
      "healthcare",
      "other",
    ])
    .required("Organization type is required"),
  tagline: Yup.string().max(150, "Tagline must be 150 characters or less"),
  description: Yup.string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be 2000 characters or less")
    .required("Description is required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .required("Phone number is required"),
  alternatePhone: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "Enter valid 10-digit mobile number"
  ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  street: Yup.string().required("Street address is required"),
  area: Yup.string().required("Area/Locality is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
});

export const STEP_FIELDS = {
  1: ["name", "type", "description", "phone", "email"],
  2: ["street", "area", "city", "state", "pincode"],
} as const;
