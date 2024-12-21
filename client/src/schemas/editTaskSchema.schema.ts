import { z } from "zod";
import { TaskStatus } from "../types/taskTypes";

const TaskEnum = z.enum([
  TaskStatus.OPEN,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE,
]);

const EditTaskSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title should not be empty" })
    .min(3, { message: "Title should be at least 3 characters long" })
    .max(100, { message: "Title should be at most 100 characters long" }),
  description: z
    .string()
    .nonempty({ message: "Description should not be empty" })
    .min(3, { message: "Description should be at least 3 characters long" })
    .max(300, { message: "Description should be at most 300 characters long" }),
  status: TaskEnum.refine((value) => TaskEnum.options.includes(value), {
    message: "Status must be one of: OPEN, IN_PROGRESS, DONE",
  }),
});

export default EditTaskSchema;
