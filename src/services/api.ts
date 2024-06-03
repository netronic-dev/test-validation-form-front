import { IFormData } from "../models";
import axios from "axios";

// const BASE_URL = "https://test-validation-form-backend.vercel.app";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;

export const addLead = async (formData: IFormData) => {
  try {
    const response = await axios.post("/form", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
