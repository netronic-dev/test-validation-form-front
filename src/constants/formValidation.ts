import * as yup from "yup";
import {
  parsePhoneNumberFromString,
  isPossiblePhoneNumber,
} from "libphonenumber-js";
import { ESelectedRadio } from "../models";

const phoneNumberValidator = (value: string | undefined): boolean => {
  if (!value) return false;

  const phoneNumber = parsePhoneNumberFromString(value);
  return phoneNumber ? phoneNumber.isValid() : false;
};

const possiblePhoneNumberValidator = (value: string | undefined): boolean => {
  if (!value) return false;

  return isPossiblePhoneNumber(value);
};

export const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .test("is-valid-phone", "Phone number is not valid", phoneNumberValidator)
      .test(
        "is-possible-phone",
        "Phone number is not possible",
        possiblePhoneNumberValidator
      ),
    nameOfForm: yup
      .string()
      .oneOf([
        ESelectedRadio.GET_CATALOG,
        ESelectedRadio.GET_PRICE,
        ESelectedRadio.ORDER_DEMO,
        ESelectedRadio.RECEIVE_CONSULTATION,
      ])
      .required("Name of form is required"),
    privacyPolicy: yup
      .boolean()
      .oneOf([true], "Privacy policy must be accepted")
      .required(),
  })
  .required();
