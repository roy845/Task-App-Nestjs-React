import useSearchTasks from "../../hooks/useSearchTasks";

const SearchTasks = () => {
  const { inputValue, handleChange } = useSearchTasks();

  return (
    <div className="w-full max-w-xs mx-auto mb-5">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="mt-1 block w-full px-3 py-2 border border-white bg-[#0d0c26] text-white rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

export default SearchTasks;
