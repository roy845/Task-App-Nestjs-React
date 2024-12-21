import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToast from "./useToast";
import { ForgotPasswordData } from "../types/authTypes";
import { forgotPassword } from "../api/serverApi";
import ForgotPasswordSchema from "../schemas/forgotPasswordSchema.schema";
import { ErrorEnum } from "../constants/errorConstants";

const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const showToast = useToast();

  const onSubmit = async (data: ForgotPasswordData): Promise<void> => {
    try {
      const { data: forgotPasswordData } = await forgotPassword(data);

      showToast({
        message: forgotPasswordData,
        options: { position: "bottom-left" },
        type: "success",
      });

      reset();
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
    onSubmit,
    isSubmitting,
  };
};

export default useForgotPasswordForm;
