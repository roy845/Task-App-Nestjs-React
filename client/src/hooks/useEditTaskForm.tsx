import { zodResolver } from "@hookform/resolvers/zod";
import EditTaskSchema from "../schemas/editTaskSchema.schema";
import { EditTaskData, Task } from "../types/taskTypes";
import { useForm } from "react-hook-form";
import useToast from "./useToast";
import useCustomNavigate from "./useCustomNavigate";
import { useEffect } from "react";
import { editTask } from "../api/serverApi";
import { NavigateOptions } from "react-router-dom";
import useLogout from "./useLogout";
import { ErrorEnum } from "../constants/errorConstants";

const useEditTaskForm = (task: Task) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditTaskData>({
    resolver: zodResolver(EditTaskSchema),
  });

  const showToast = useToast();
  const logout: () => void = useLogout();
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  useEffect(() => {
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("status", task.status);
  }, [task, setValue]);

  const onSubmit = async (data: EditTaskData): Promise<void> => {
    try {
      const { data: EditTaskReturn } = await editTask(data, task.id);
      const { message } = EditTaskReturn;
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
    customNavigate,
  };
};

export default useEditTaskForm;
