import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToast from "./useToast";
import useCustomNavigate from "./useCustomNavigate";
import { AddTaskData } from "../types/taskTypes";
import CreateTaskSchema from "../schemas/addTaskSchema.schema";
import { createTask } from "../api/serverApi";
import { NavigateOptions } from "react-router-dom";
import useLogout from "./useLogout";
import { ErrorEnum } from "../constants/errorConstants";

const useAddTaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskData>({
    resolver: zodResolver(CreateTaskSchema),
  });

  const showToast = useToast();
  const logout: () => void = useLogout();
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const onSubmit = async (data: AddTaskData): Promise<void> => {
    try {
      const { data: CreateTaskReturn } = await createTask(data);
      const { message } = CreateTaskReturn;
      customNavigate("/tasks", { replace: true });
      showToast({
        message,
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
        logout();
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

export default useAddTaskForm;
