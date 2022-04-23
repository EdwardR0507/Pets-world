import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const RegisterPet = lazy(() => import("../pages/user/pets/RegisterPet"));
const Pets = lazy(() => import("../pages/user/pets/Pets"));
const Pet = lazy(() => import("../pages/user/pets/Pet"));

const PetRouter = () => {
  return (
    <Routes>
      <Route path="pets/register" element={<RegisterPet />} />
      <Route path="pets" element={<Pets />} />
      <Route path="pets/:id" element={<Pet />} />
    </Routes>
  );
};

export default PetRouter;
