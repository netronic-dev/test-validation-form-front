import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Icons } from "./components/Icons";

const FormPage = lazy(() => import("./pages/FormPage/FormPage"));
const TestPage = lazy(() => import("./pages/TestPage/TestPage"));

function App() {
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
</>
  );
}

export default App;
