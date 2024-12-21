import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useLogout from "../../hooks/useLogout";
import { AllowedRoles } from "../../types/roles.types";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/common/Spinner";
import useCheckToken from "../useCheckToken";

type CheckTokenProps = {
  allowedRoles: AllowedRoles[];
};

export const CheckToken = ({ allowedRoles }: CheckTokenProps) => {
  const { pathname } = useLocation();
  const { auth } = useAuth();
  // const logout = useLogout();

  const { loading, expired, isRolesValid } = useCheckToken(allowedRoles);

  if (loading) {
    return <Spinner />;
  }

  if (expired) {
    // logout();
  }

  return !expired && isRolesValid ? (
    <Outlet />
  ) : auth?.accessToken && !expired ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/" state={{ from: pathname }} replace />
  );
};
