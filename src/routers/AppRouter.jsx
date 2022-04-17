import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import NavBar from "../ui/NavBar";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const AuthRouter = lazy(() => import("./AuthRouter"));
const PetRouter = lazy(() => import("./PetRouter"));
const HomeUser = lazy(() => import("../pages/user/HomeUser"));
const PublicRouter = lazy(() => import("./PublicRouter"));
const PrivateRouter = lazy(() => import("./PrivateRouter"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <NavBar />
        <Routes>
          <Route
            path="/"
            index
            element={
              <PublicRouter>
                <Home />
              </PublicRouter>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRouter>
                <About />
              </PublicRouter>
            }
          />
          <Route
            path="/auth/*"
            element={
              <PublicRouter>
                <AuthRouter />
              </PublicRouter>
            }
          />
          <Route
            path="/user/*"
            element={
              <PrivateRouter>
                <PetRouter />
              </PrivateRouter>
            }
          />
          <Route
            path="/user/home"
            element={
              <PrivateRouter>
                <HomeUser />
              </PrivateRouter>
            }
          />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
