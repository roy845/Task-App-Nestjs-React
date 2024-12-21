import { useLocation } from "react-router-dom";
import Header from "../common/Header";
import AuthButton from "./AuthButton";
import Links from "./Links";
import LoggedInUser from "./LoggedInUser";

const Topbar = (): React.JSX.Element => {
  const { pathname } = useLocation();
  return (
    <div className="bg-[#0d0c26] p-4 text-white flex items-center justify-between shadow-lg">
      <Header
        sm
        title={
          pathname === "/users" || pathname === "/roles" ? "Admin" : "Tasks"
        }
      />
      <LoggedInUser />
      <Links />
      <AuthButton />
    </div>
  );
};

export default Topbar;
