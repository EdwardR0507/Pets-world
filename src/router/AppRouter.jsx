import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "../ui/Spinner";
import NavBar from "../ui/NavBar";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
