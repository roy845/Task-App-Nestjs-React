import toast, { ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error";

type ToastProps = {
  message: string;
  options?: ToastOptions;
  type?: ToastType;
};

const useToast = (): (({ message, options, type }: ToastProps) => void) => {
  const showToast = ({ message, options, type }: ToastProps): void => {
    type === "success"
      ? toast.success(message, options)
      : toast.error(message, options);
  };

  return showToast;
};

export default useToast;
