import { User, UserRoles } from "../../types/userTypes.types";
import Button from "../common/Button";
import Label from "../common/Label";
import Input from "../common/Input";
import FormError from "../common/FormError";
import { IoMdPersonAdd } from "react-icons/io";
import useAssignRoles from "../../hooks/useAssignRoles";

type AssignRolesFormProps = {
  users: User[];
  roles: UserRoles[];
};

const AssignRolesForm = ({ users, roles }: AssignRolesFormProps) => {
  const { handleSubmit, onSubmit, register, errors } = useAssignRoles();
  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-8 shadow-md rounded-md border border-white"
      >
        <div className="flex flex-col items-center">
          <IoMdPersonAdd size={50} />
        </div>
        <Label label="Select User" />
        <Input
          register={register}
          fieldName="userId"
          placeholder="Select User"
          options={users?.map((user) => ({
            value: user.id,
            label: user.username,
          }))}
        />

        {errors.userId && <FormError message={errors.userId.message} />}

        <div className="mb-4 items-start">
          <Label label="Select Roles" />
          <Input
            register={register}
            fieldName="roleNames"
            options={roles?.map((role) => ({
              value: role,
              label: role,
            }))}
            placeholder="Select Role(s)"
            multiple
          />
          {errors.roleNames && <FormError message={errors.roleNames.message} />}
        </div>

        <div className="flex justify-center mt-4">
          <Button type="submit" text="Assign Role(s)" />
        </div>
      </form>
    </div>
  );
};

export default AssignRolesForm;
