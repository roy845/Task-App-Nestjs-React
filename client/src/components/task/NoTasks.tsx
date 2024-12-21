import { FaTasks } from "react-icons/fa";

const NoTasks = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-52 text-center">
      <FaTasks className="text-white" size={50} />
      <h2 className="mt-5 text-white">No tasks available</h2>
      <p className="text-white">
        You have no tasks at the moment. Enjoy your free time!
      </p>
    </div>
  );
};

export default NoTasks;
