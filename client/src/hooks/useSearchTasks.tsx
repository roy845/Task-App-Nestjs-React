import React, { useEffect, useState } from "react";
import { setSearchTask } from "../features/task/taskSlice";
import useDebounce from "./useDebounce";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const useSearchTasks = () => {
  const { searchTasks } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>(searchTasks);

  const debouncedDispatch: (...args: any[]) => void = useDebounce(
    (value: string) => {
      dispatch(setSearchTask(value));
    },
    500
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    debouncedDispatch(inputValue);
  }, [inputValue, debouncedDispatch]);

  return { inputValue, handleChange };
};

export default useSearchTasks;
