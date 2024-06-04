import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse, IFormData } from "../models";

// const BASE_URL = "https://test-validation-form-backend.vercel.app";
const BASE_URL = "http://localhost:5000";

axios.defaults.baseURL = BASE_URL;
export const addLead = async (
  formData: IFormData,
  callback: (success: boolean) => void
) => {
  try {
    const response = await axios.post("/form", formData);
    callback(true);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const responseData = axiosError.response.data as ErrorResponse;
        toast.error(responseData.name);
      } else {
        toast.error("Unknown error occurred");
      }
    } else {
      toast.error("An unexpected error occurred");
    }
    callback(false);
  }
};
