import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useToggle = (key: string, initialValue: boolean = false) => {
  const { getValue, setValue } = useLocalStorage();
  const [state, setState] = useState<boolean>(getValue(key) || initialValue);

  const toggleState = () => {
    setState((prev) => !prev);
  };

  useEffect(() => {
    setValue(key, state);
  }, [key, state]);

  return { state, toggleState };
};

export default useToggle;
