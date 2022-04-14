import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RegisterPet = lazy(() => import("../pages/user/pets/RegisterPet"));
const Pets = lazy(() => import("../pages/user/pets/Pets"));

const PetRouter = () => {
  return (
    <Routes>
      <Route path="register-pet" element={<RegisterPet />} />
      <Route path="pets" element={<Pets />} />
    </Routes>
  );
};

export default PetRouter;
