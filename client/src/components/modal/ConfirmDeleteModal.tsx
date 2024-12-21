import React from "react";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: (taskId: number) => Promise<void>;
  taskId: number;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
  taskId,
}): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#0d0c22] p-4 rounded shadow-md w-1/3">
        <div className="font-bold text-lg mb-4 text-center">Confirm Delete</div>
        <div className="mb-4 text-center">
          Are you sure you want to delete this task?
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onConfirm(taskId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
