import { useForm } from "react-hook-form";
import {
  AssignRolesFormData,
  assignRolesSchema,
} from "../schemas/assignRolesSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const useAssignRoles = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignRolesFormData>({
    resolver: zodResolver(assignRolesSchema),
  });

  const onSubmit = (data: AssignRolesFormData) => {
    const { userId, roleNames } = data;
    console.log(userId, roleNames);
    // Perform the assign role action here
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
};

export default useAssignRoles;
