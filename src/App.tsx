import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Icons } from "./components/Icons";

const FormPage = lazy(() => import("./pages/FormPage/FormPage"));
const TestPage = lazy(() => import("./pages/TestPage/TestPage"));

function App() {

  const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};

    if (urlParams.has("utm_source")) {
      const utmSource = urlParams.get("utm_source");
      if (utmSource !== null) {
        params.utm_source = utmSource;
      }
    }
    if (urlParams.has("utm_medium")) {
      const utmMedium = urlParams.get("utm_medium");
      if (utmMedium !== null) {
        params.utm_medium = utmMedium;
      }
    }

    if (urlParams.has("utm_campaign")) {
      const utmCampaign = urlParams.get("utm_campaign");
      if (utmCampaign !== null) {
        params.utm_campaign = utmCampaign;
      }
    }

    if (urlParams.has("utm_content")) {
      const utmContent = urlParams.get("utm_content");
      if (utmContent !== null) {
        params.utm_content = utmContent;
      }
    }

    if (urlParams.has("utm_term")) {
      const utmTerm = urlParams.get("utm_term");
      if (utmTerm !== null) {
        params.utm_term = utmTerm;
      }
    }

    return params;
  };


 useEffect(() => {
   const storedQuery = sessionStorage.getItem("query");
   if (!storedQuery) {
     const params = getUTMParams();
     if (Object.keys(params).length > 0) {
       sessionStorage.setItem("query", JSON.stringify(params));
     }
   }
 }, []);

  return (
    <>
      <Icons />
      <div className="main-container">
        <Routes>
          {/* <Route path="/" element={<SharedLayout />}> */}
          <Route index element={<FormPage />} />
          <Route path="test" element={<TestPage />} />
          {/* </Route> */}
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
