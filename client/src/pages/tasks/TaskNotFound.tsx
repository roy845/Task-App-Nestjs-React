import { MdAddTask } from "react-icons/md";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Button from "../../components/common/Button";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import { NavigateOptions, Params, useParams } from "react-router-dom";

const TaskNotFound = (): JSX.Element => {
  const { taskId } = useParams<Readonly<Params<string>>>();

  useDocumentTitle(`Task ${taskId} not found`);

  const navigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <MdAddTask className="text-6xl text-red-500" />
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">
        Task Not Found
      </h1>
      <p className="text-gray-600 mb-4">
        Sorry, the task you are looking for does not exist.
      </p>
      <Button type="button" onClick={() => navigate("/")} text="Go Back" />
    </div>
  );
};

export default TaskNotFound;
