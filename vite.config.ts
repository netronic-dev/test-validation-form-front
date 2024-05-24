import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/test-validation-form-front/",
  server: {
    open: "/test-validation-form-front/",
    port: 3000,
  },
});
