import { IFormData } from "../models";
import axios from "axios";

const BASE_URL = "https://test-validation-form-backend.vercel.app";

axios.defaults.baseURL = BASE_URL;

export const addLead = async (formData: IFormData) => {
  try {
    const response = await axios.post("/form", formData);
    console.log(response, "response");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// export const addLead = async (formData: IFormData) => {
//   console.log(formData, "formData");
//   const response = await fetch(
//     // "https://test-validation-form-backend.vercel.app/form",
//     "http://localhost:5000/form",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     }
//   );
//   if (!response.ok) {
//     throw new Error("Failed to add client");
//   }
//   return response.json();
// };
