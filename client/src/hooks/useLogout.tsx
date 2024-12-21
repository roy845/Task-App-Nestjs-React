import { logout } from "../api/serverApi";
import { ErrorEnum } from "../constants/errorConstants";
import { useAuth } from "../context/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useToast from "./useToast";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const showToast = useToast();

  const navigate: NavigateFunction = useNavigate();

  const logoutHandler = async (): Promise<void> => {
    setAuth(null);
    try {
      await logout();
      navigate("/");
      setPersist(false);
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        showToast({
          message: error?.message,
          type: "error",
          options: { position: "bottom-left" },
        });
      }
    }
  };
  return logoutHandler;
};

export default useLogout;
