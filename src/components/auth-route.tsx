import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/Auth";

const AuthRoute = () => {
  const { session } = useAuth();
  const location = useLocation();

  return session ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
