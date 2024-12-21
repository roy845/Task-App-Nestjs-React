import useCustomNavigate from "./useCustomNavigate";
import { NavigateOptions } from "react-router-dom";

const useTask = () => {
  const navigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "hover:bg-red-500 cursor-pointer border-red-500";
      case "IN_PROGRESS":
        return "hover:bg-yellow-500 cursor-pointer border-yellow-500";
      case "DONE":
        return "hover:bg-green-500 cursor-pointer border-green-500";
      default:
        return "hover:bg-gray-500 cursor-pointer border-gray-500";
    }
  };

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const navigateToTaskComponent = (taskId: number): void => {
    navigate(`/task/${taskId}`);
  };

  const handleEdit = (taskId: number) => {
    navigate(`/editTask/${taskId}`);
  };

  return {
    handleEdit,
    getStatusColor,
    truncateDescription,
    navigateToTaskComponent,
  };
};

export default useTask;
