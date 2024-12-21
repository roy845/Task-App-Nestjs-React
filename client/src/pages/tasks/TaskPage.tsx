import { Params, useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import MainLayout from "../../components/layouts/Layout";
import useFetch from "../../hooks/useFetch";
import { Task } from "../../types/taskTypes";
import { API_URLS } from "../../api/api-urls";
import Spinner from "../../components/common/Spinner";
import TaskComp from "../../components/task/TaskComp";
import useHandleUnauthorizedOrNetworkError from "../../hooks/useHandleUnauthorizedOrNetworkError";
import { HttpStatusCode } from "axios";
import useCustomNavigate from "../../hooks/useCustomNavigate";

const TaskPage = (): JSX.Element => {
  const { taskId } = useParams<Readonly<Params<string>>>();
  const navigate = useCustomNavigate();

  const {
    error,
    data: task,
    isLoading,
  } = useFetch<Task>(`${API_URLS.getAllTasks}/${taskId}`, {});

  useHandleUnauthorizedOrNetworkError(error);

  if (error?.response?.status === HttpStatusCode.NotFound) {
    navigate(`/taskNotFound/${taskId}`);
  }

  return (
    <MainLayout title={`Task ${taskId}`}>
      <Header title="Task" />
      {isLoading ? <Spinner /> : task && <TaskComp task={task} />}
    </MainLayout>
  );
};

export default TaskPage;
