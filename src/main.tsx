import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/test-validation-form-front">
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
