import useAddTaskForm from "../../hooks/useAddTaskForm";
import Button from "../common/Button";
import FormError from "../common/FormError";
import Input from "../common/Input";
import Label from "../common/Label";
import Textarea from "../common/TextArea";
import { MdAddTask } from "react-icons/md";

const AddTaskForm = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useAddTaskForm();
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 shadow-md rounded-md border border-white"
      >
        <div className="flex flex-col items-center">
          <MdAddTask size={50} />
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
        <div className="flex justify-center mb-4">
          <Button type="submit" text="Add task" disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
