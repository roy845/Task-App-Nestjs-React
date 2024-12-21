import { API_URLS } from "../../api/api-urls";
import Spinner from "../../components/common/Spinner";
import MainLayout from "../../components/layouts/Layout";
import TasksList from "../../components/task/TasksList";
import useFetch from "../../hooks/useFetch";
import { Task } from "../../types/taskTypes";
import SearchTasks from "../../components/task/SearchTasks";
import { useAppSelector } from "../../app/hooks";
import NoTasks from "../../components/task/NoTasks";
import { RootState } from "../../app/store";
import useHandleUnauthorizedOrNetworkError from "../../hooks/useHandleUnauthorizedOrNetworkError";

const Tasks = () => {
  const { searchTasks } = useAppSelector((state: RootState) => state.task);

  const {
    data: tasks,
    error,
    isLoading,
  } = useFetch<Task[]>(API_URLS.getAllTasks, { search: searchTasks });

  useHandleUnauthorizedOrNetworkError(error);

  return (
    <MainLayout title="Tasks">
      <SearchTasks />
      {isLoading ? (
        <Spinner />
      ) : tasks && tasks.length > 0 ? (
        <TasksList tasks={tasks} />
      ) : (
        <NoTasks />
      )}
    </MainLayout>
  );
};

export default Tasks;
