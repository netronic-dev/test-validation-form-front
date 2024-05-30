import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PHONE_COUNTRIES } from "../utils";

export const validatePhoneNumber = (phoneNumber: string) => {
  console.log(phoneNumber, "phoneNumber");
  if (!phoneNumber) return "Phone number is required";

  const parsedNumber = parsePhoneNumberFromString(phoneNumber);
  if (!parsedNumber) return "Invalid phone number format";

  const countryCode = parsedNumber.country;

  console.log(countryCode, "countryCode");
  const countryData = PHONE_COUNTRIES.find(
    (country) => country.iso2 === countryCode
  );

  if (!countryData) return "Invalid country code";
  const isValidPhoneNumber = countryData.validation.test(phoneNumber);

  return isValidPhoneNumber ? undefined : "Invalid phone number";
};