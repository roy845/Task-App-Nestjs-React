import Header from "../../components/common/Header";
import MainLayout from "../../components/layouts/Layout";
import AddTaskForm from "../../components/task/AddTaskForm";

const AddTask = (): JSX.Element => {
  return (
    <MainLayout title="Add Task">
      <Header title="Add Task" />
      <AddTaskForm />
    </MainLayout>
  );
};

export default AddTask;
