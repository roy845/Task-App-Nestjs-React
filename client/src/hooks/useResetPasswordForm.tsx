import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import useToast from "./useToast";
import useCustomNavigate from "./useCustomNavigate";
import { ResetPasswordData } from "../types/authTypes";
import { ResetPasswordSchema } from "../schemas/resetPasswordSchema.schema";
import { resetPassword } from "../api/serverApi";
import { NavigateOptions } from "react-router-dom";
import { ErrorEnum } from "../constants/errorConstants";

const useResetPasswordForm = (token: string) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const showToast = useToast();
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setPasswordVisible((prev: boolean) => !prev);
  };

  const onSubmit = async (data: ResetPasswordData): Promise<void> => {
    try {
      const { confirmPassword, ...finalFormData } = data;
      const { data: successMessage } = await resetPassword({
        ...finalFormData,
        token,
      });
      customNavigate("/", { replace: true });
      showToast({
        message: successMessage,
        options: { position: "bottom-left" },
        type: "success",
      });
    } catch (error: any) {
      if (error?.message === ErrorEnum.NETWORK_ERROR) {
        showToast({
          message: error?.message,
          options: { position: "bottom-left" },
          type: "error",
        });
      } else {
        showToast({
          message: error?.response?.data?.message,
          options: { position: "bottom-left" },
          type: "error",
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    passwordVisible,
    setPasswordVisible,
    togglePasswordVisibility,
    onSubmit,
  };
};

export default useResetPasswordForm;
