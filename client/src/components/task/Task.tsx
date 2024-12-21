import useTask from "../../hooks/useTask";
import { Task as TaskType } from "../../types/taskTypes";

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const { getStatusColor, truncateDescription, navigateToTaskComponent } =
    useTask();

  return (
    <div
      onClick={() => navigateToTaskComponent(task.id)}
      className={`p-4 border-2 rounded-lg shadow-md ${getStatusColor(
        task.status
      )} transition duration-300 hover:text-black`}
    >
      <div className="font-bold text-xl mb-2 break-words">{task.title}</div>
      <div className="text-base break-words">
        {truncateDescription(task.description, 100)}
      </div>
      <div className="text-sm mt-2 break-words">
        <span className="font-semibold">Status: </span>
        {task.status}
      </div>
    </div>
  );
};

export default Task;
