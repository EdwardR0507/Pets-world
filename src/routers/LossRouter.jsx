import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LossRegister = lazy(() => import("../pages/loss/LossRegister"));
const LossSearch = lazy(() => import("../pages/loss/LossSearch"));

const LossRouter = () => {
  return (
    <Routes>
      <Route path="register" element={<LossRegister />} />
      <Route path="search" element={<LossSearch />} />
    </Routes>
  );
};

export default LossRouter;
