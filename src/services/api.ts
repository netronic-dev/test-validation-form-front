import axios from "axios";
import { IFormData } from "../models";

// const BASE_URL = "https://test-validation-form-backend.vercel.app";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
export const addLead = async (
  formData: IFormData,
  callback: (success: boolean) => void
) => {
  try {
    console.log(formData, "formData");
    const response = await axios.post("/form", formData);
    callback(true);
    return response.data;
  } catch (error) {
    callback(false);
    return error;
  }
};
