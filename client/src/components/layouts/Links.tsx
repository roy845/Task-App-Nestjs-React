import { Link } from "react-router-dom";
import { menuItemsType } from "../../types/menuItems.types";
import { menuItems } from "../../constants/menuConstants";
import { UserRoles } from "../../types/userTypes.types";
import useLinks from "../../hooks/useLinks";

const Links = (): React.JSX.Element => {
  const { decodedToken, location } = useLinks();

  return (
    <ul className="flex">
      {menuItems
        .filter((mi: menuItemsType) => {
          if (
            (mi.name === "Users" || mi.name === "Roles") &&
            !decodedToken?.roles.includes(UserRoles.ADMIN)
          ) {
            return false;
          }
          return true;
        })
        .map((mi: menuItemsType) => {
          const isActive: boolean = location.pathname === mi.href;
          return (
            <Link to={mi.href} key={mi.name}>
              <li
                className={`min-w-[100px] p-2.5 rounded-xl font-medium text-center cursor-pointer border-gray-300 ${
                  isActive
                    ? "bg-slate-400 text-white"
                    : "hover:bg-slate-400 hover:text-white"
                }`}
              >
                {mi.name}
              </li>
            </Link>
          );
        })}
    </ul>
  );
};

export default Links;
