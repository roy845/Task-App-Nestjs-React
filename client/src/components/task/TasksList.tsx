import { Task as TaskType } from "../../types/taskTypes";
import Task from "./Task";

type TasksListProps = {
  tasks: TaskType[] | null;
};
const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
