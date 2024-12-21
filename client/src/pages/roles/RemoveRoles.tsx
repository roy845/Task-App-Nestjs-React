import Header from "../../components/common/Header";
import MainLayout from "../../components/layouts/Layout";
import RemoveRolesForm from "../../components/roles/RemoveRolesForm";

type Props = {};

const RemoveRoles = (props: Props) => {
  return (
    <MainLayout title="Remove Roles">
      <Header title="Remove Roles" />
      <RemoveRolesForm />
    </MainLayout>
  );
};

export default RemoveRoles;
