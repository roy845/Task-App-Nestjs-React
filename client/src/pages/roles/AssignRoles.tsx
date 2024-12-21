import { API_URLS } from "../../api/api-urls";
import Header from "../../components/common/Header";
import Spinner from "../../components/common/Spinner";
import MainLayout from "../../components/layouts/Layout";
import AssignRolesForm from "../../components/roles/AssignRolesForm";
import useFetch from "../../hooks/useFetch";
import useHandleUnauthorizedOrNetworkError from "../../hooks/useHandleUnauthorizedOrNetworkError";
import { User, UserRoles } from "../../types/userTypes.types";

const AssignRoles = () => {
  const {
    error: errorUsers,
    data: users,
    isLoading: isLoadingUsers,
  } = useFetch<User[]>(API_URLS.getAllUsers, {});
  const {
    error: errorRoles,
    data: roles,
    isLoading: isLoadingRoles,
  } = useFetch<UserRoles[]>(API_URLS.getAllRoles, {});

  useHandleUnauthorizedOrNetworkError(errorUsers);
  useHandleUnauthorizedOrNetworkError(errorRoles);

  return (
    <MainLayout title="Assign Roles">
      <Header title="Assign Roles" />
      {isLoadingUsers || isLoadingRoles ? (
        <Spinner />
      ) : (
        <AssignRolesForm users={users as User[]} roles={roles as UserRoles[]} />
      )}
    </MainLayout>
  );
};

export default AssignRoles;
