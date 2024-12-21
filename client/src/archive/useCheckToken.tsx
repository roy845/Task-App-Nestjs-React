import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useCustomNavigate from "../hooks/useCustomNavigate";
import useToast from "../hooks/useToast";
import { HttpStatusCode } from "axios";
import { checkTokenExpiration } from "../api/serverApi";
import { ErrorEnum } from "../constants/errorConstants";
import { AllowedRoles } from "../types/roles.types";

type UseCheckTokenResult = {
  loading: boolean;
  expired: boolean;
  isRolesValid: boolean;
};

const useCheckToken = (allowedRoles: AllowedRoles[]): UseCheckTokenResult => {
  const { pathname } = useLocation();
  // const logout = useLogout();
  const navigate = useCustomNavigate();
  const showToast = useToast();

  const [expired, setExpired] = useState<boolean>(false);
  const [isRolesValid, setIsRolesValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const {
          data: { isExpired, rolesValid },
        } = await checkTokenExpiration(allowedRoles);
        setLoading(false);
        setExpired(isExpired);
        setIsRolesValid(rolesValid);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        if (error?.response?.status === HttpStatusCode.Forbidden) {
          navigate("/unauthorized");
        } else if (
          error?.response?.status === HttpStatusCode.Unauthorized ||
          error?.response?.status === HttpStatusCode.BadRequest
        ) {
          // logout();
        } else if (error.message === ErrorEnum.NETWORK_ERROR) {
          showToast({
            message: error.message,
            options: { position: "bottom-left" },
          });
        }
      }
    };

    checkToken();
  }, [pathname, allowedRoles, navigate, showToast]);

  return { loading, expired, isRolesValid };
};

export default useCheckToken;
