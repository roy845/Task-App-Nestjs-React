import useDeleteTaskModal from "../../hooks/useDeleteTaskModal";
import useGoBack from "../../hooks/useGoBack";
import useTask from "../../hooks/useTask";
import { Task } from "../../types/taskTypes";
import Button from "../common/Button";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";

type EditTaskFormProps = {
  task: Task;
};

const TaskComp = ({ task }: EditTaskFormProps): JSX.Element => {
  const { getStatusColor, truncateDescription, handleEdit } = useTask();

  const { closeModal, confirmDelete, handleDelete, isModalOpen, isDeleting } =
    useDeleteTaskModal();

  const goBack = useGoBack();

  return (
    <>
      <div
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
      <div className="flex justify-center mt-4">
        <Button type="button" onClick={() => handleEdit(task.id)} text="Edit" />

        <button
          onClick={goBack}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2 ml-2"
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        taskId={task.id}
      />
    </>
  );
};

export default TaskComp;
