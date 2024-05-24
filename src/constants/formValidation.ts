import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: yup.string().required("Phone number is required"),
    privacyPolicy: yup
      .boolean()
      .oneOf([true], "Privacy policy must be accepted")
      .required(),
  })
  .required();
