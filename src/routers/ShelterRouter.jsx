import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const SearchShelter = lazy(() => import("../pages/shelter/SearchShelters"));
const Shelter = lazy(() => import("../pages/shelter/Shelter"));

const UserShelterRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchShelter />} />
      <Route path=":id" element={<Shelter />} />
    </Routes>
  );
};
export default UserShelterRouter;
