import { Task } from "../../types/taskTypes";
import { FaEdit } from "react-icons/fa";
import Label from "../common/Label";
import Textarea from "../common/TextArea";
import FormError from "../common/FormError";
import Button from "../common/Button";
import Input from "../common/Input";
import useEditTaskForm from "../../hooks/useEditTaskForm";
import { statusOptions } from "../../constants/statusConstants";

type EditTaskFormProps = {
  task: Task;
};

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isSubmitting,
    customNavigate,
  } = useEditTaskForm(task);

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 shadow-md rounded-md border border-white"
      >
        <div className="flex flex-col items-center">
          <FaEdit size={50} />
        </div>
        <div className="mb-4 items-start">
          <Label label="Title" />
          <Input
            register={register}
            fieldName="title"
            placeholder="Enter title"
            type="text"
          />
          {errors.title && <FormError message={errors.title.message} />}
        </div>
        <div className="mb-4 items-start">
          <Label label="Description" />
          <Textarea
            register={register}
            fieldName="description"
            placeholder="Enter description"
          />
          {errors.description && (
            <FormError message={errors.description.message} />
          )}
        </div>

        <div className="mb-4 items-start">
          <Label label="Status" />
          <Input
            register={register}
            fieldName="status"
            placeholder="Enter Status"
            options={statusOptions}
          />
          {errors.status && <FormError message={errors.status.message} />}
        </div>
        <div className="flex justify-center mb-4 gap-4">
          <Button type="submit" text="Edit task" disabled={isSubmitting} />
          <button
            onClick={() => customNavigate("/tasks", { replace: true })}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
