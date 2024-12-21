import { RouterProvider } from "react-router-dom";
import useRoutes from "../hooks/useRoutes";

const AppRoutes = (): JSX.Element => {
  const router = useRoutes();
  return <RouterProvider router={router} />;
};

export default AppRoutes;
