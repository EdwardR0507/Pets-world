import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Shelters = lazy(() => import("../pages/user/shelters/Shelters"));
const RegisterShelter = lazy(() =>
  import("../pages/user/shelters/RegisterShelter")
);

const UserShelterRouter = () => {
  return (
    <Routes>
      <Route path="shelters" element={<Shelters />} />
      <Route path="shelters/register" element={<RegisterShelter />} />
    </Routes>
  );
};
export default UserShelterRouter;
