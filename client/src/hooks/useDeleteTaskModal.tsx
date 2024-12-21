import { useState } from "react";
import { deleteTask } from "../api/serverApi";
import useCustomNavigate from "./useCustomNavigate";
import { NavigateOptions } from "react-router-dom";
import useLogout from "./useLogout";
import useToast from "./useToast";

const useDeleteTaskModal = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  const logout = useLogout();
  const showToast = useToast();

  const handleDelete = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const confirmDelete = async (taskId: number): Promise<void> => {
    try {
      setIsDeleting(true);
      await deleteTask(taskId);
      setIsDeleting(false);
      setModalOpen(false);
      showToast({
        message: "Task Deleted Successfully",
        type: "success",
        options: { position: "bottom-left" },
      });
      navigate("/tasks");
    } catch (error) {
      setModalOpen(false);
      // logout();
    }
  };

  return {
    handleDelete,
    isModalOpen,
    isDeleting,
    closeModal,
    confirmDelete,
  };
};

export default useDeleteTaskModal;
