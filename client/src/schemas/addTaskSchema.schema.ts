import { z } from "zod";

const CreateTaskSchema = z.object({
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
});

export default CreateTaskSchema;
