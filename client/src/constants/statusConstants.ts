import { StatusOptions, TaskStatus } from "../types/taskTypes";

export const statusOptions: StatusOptions[] = [
  { label: TaskStatus.OPEN, value: TaskStatus.OPEN },
  { label: TaskStatus.IN_PROGRESS, value: TaskStatus.IN_PROGRESS },
  { label: TaskStatus.DONE, value: TaskStatus.DONE },
];
