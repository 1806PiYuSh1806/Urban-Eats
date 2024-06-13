import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    children
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
};

export default AuthRoute;
