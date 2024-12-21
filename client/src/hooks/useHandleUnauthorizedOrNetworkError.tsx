import { useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import useLogout from "./useLogout";

const useHandleUnauthorizedOrNetworkError = (error: any) => {
  const logout: () => void = useLogout();

  useEffect(() => {
    if (
      error?.response?.status === StatusCodes.UNAUTHORIZED ||
      error?.message === "Network Error"
    ) {
      logout();
    }
  }, [error]);
};

export default useHandleUnauthorizedOrNetworkError;
