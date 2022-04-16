import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "../ui/Spinner";
import NavBar from "../ui/NavBar";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const AuthRouter = lazy(() => import("./AuthRouter"));
const PetRouter = lazy(() => import("./PetRouter"));
const HomeUser = lazy(() => import("../pages/user/HomeUser"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <NavBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/user/*" element={<PetRouter />} />
          <Route path="/user/home" element={<HomeUser />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
