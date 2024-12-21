import Header from "../../components/common/Header";
import MainLayout from "../../components/layouts/Layout";
import RoleTiles from "../../components/roles/RoleTiles";

const RolesPage = () => {
  return (
    <MainLayout title="Roles">
      <Header title="Roles" />
      <RoleTiles />
    </MainLayout>
  );
};

export default RolesPage;
