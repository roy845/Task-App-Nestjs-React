import { z } from "zod";
import { UserRoles } from "../types/userTypes.types";

export const assignRolesSchema = z.object({
  userId: z.string().min(1, "User is required"),
  roleNames: z
    .array(z.nativeEnum(UserRoles))
    .min(1, "At least one role is required"),
});

export type AssignRolesFormData = z.infer<typeof assignRolesSchema>;
