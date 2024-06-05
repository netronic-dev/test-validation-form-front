import axios, { AxiosError } from "axios";
import { ErrorResponse, IFormData } from "../models";

// const BASE_URL = "https://test-validation-form-backend.vercel.app";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;

export const addLead = async (
  formData: IFormData,
) => {
  try {
    const response = await axios.post("/form", formData);
    return response.data;
  } catch (error) {

    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      throw axiosError.response;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
