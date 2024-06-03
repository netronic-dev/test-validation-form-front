import { IFormData } from "../models";

export const addLead = async (formData: IFormData) => {
  console.log(formData, "formData");
  const response = await fetch(
    // "https://test-validation-form-backend.vercel.app/form",
    "http://localhost:5000/form",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add client");
  }
  return response.json();
};
