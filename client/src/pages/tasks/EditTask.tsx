import { Params, useParams } from "react-router-dom";
import MainLayout from "../../components/layouts/Layout";
import Header from "../../components/common/Header";
import EditTaskForm from "../../components/task/EditTaskForm";
import { API_URLS } from "../../api/api-urls";
import { Task } from "../../types/taskTypes";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/common/Spinner";
import { HttpStatusCode } from "axios";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import useHandleUnauthorizedOrNetworkError from "../../hooks/useHandleUnauthorizedOrNetworkError";

const EditTask = () => {
  const { taskId } = useParams<Readonly<Params<string>>>();
  const navigate = useCustomNavigate();

  const {
    error,
    data: task,
    isLoading,
  } = useFetch<Task>(`${API_URLS.getAllTasks}/${taskId}`, {});

  if (error?.response?.status === HttpStatusCode.NotFound) {
    navigate(`/taskNotFound/${taskId}`);
  }

  useHandleUnauthorizedOrNetworkError(error);

  return (
    <MainLayout title={`Edit Task ${taskId}`}>
      <Header title="Edit Task" />
      {isLoading ? <Spinner /> : task && <EditTaskForm task={task} />}
    </MainLayout>
  );
};

export default EditTask;
