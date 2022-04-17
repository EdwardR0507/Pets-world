import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const PublicRouter = ({ children }) => {
  const { auth } = useSelector((state) => state.auth);
  return Object.keys(auth).length === 0 ? (
    children
  ) : (
    <Navigate to="/user/home" />
  );
};
export default PublicRouter;
