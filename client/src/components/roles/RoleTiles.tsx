import Tile from "../common/Tile";

const RoleTiles = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Tile route="/roles/assignRoles" text="Assign Roles" />
        <Tile route="/roles/removeRoles" text="Remove Roles" />
      </div>
    </div>
  );
};

export default RoleTiles;
