import { z } from "zod";
import CreateTaskSchema from "../schemas/addTaskSchema.schema";
import EditTaskSchema from "../schemas/editTaskSchema.schema";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

export enum TaskStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type StatusOptions = {
  label: string;
  value: string;
};

export type CreateTaskDto = {
  title: string;
  description: string;
};

export type CreateTaskReturn = {
  task: Task;
  message: string;
};

export type AddTaskData = z.infer<typeof CreateTaskSchema>;
export type EditTaskData = z.infer<typeof EditTaskSchema>;
