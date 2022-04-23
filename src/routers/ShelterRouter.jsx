import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Shelter = lazy(() => import("../pages/user/shelters/Shelter"));
const Shelters = lazy(() => import("../pages/user/shelters/Shelters"));
const RegisterShelter = lazy(() =>
  import("../pages/user/shelters/RegisterShelter")
);

const ShelterRouter = () => {
  return (
    <Routes>
      <Route path="shelters/:id" element={<Shelter />} />
      <Route path="shelters" element={<Shelters />} />
      <Route path="shelters/register" element={<RegisterShelter />} />
    </Routes>
  );
};
export default ShelterRouter;
