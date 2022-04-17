import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRouter = ({ children }) => {
  const {
    auth: { token },
  } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/auth/login" />;
};
export default PrivateRouter;
