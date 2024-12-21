import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import PersistLogin from "../components/auth/persistLogin/PersistLogin";
import RequireAuth from "../components/RequireAuth";
import { UserRoles } from "../types/userTypes.types";
import Tasks from "../pages/tasks/Tasks";
import AddTask from "../pages/tasks/AddTask";
import TaskPage from "../pages/tasks/TaskPage";
import TaskNotFound from "../pages/tasks/TaskNotFound";
import EditTask from "../pages/tasks/EditTask";
import UsersPage from "../pages/users/UsersPage";
import RolesPage from "../pages/roles/RolesPage";
import AssignRoles from "../pages/roles/AssignRoles";
import RemoveRoles from "../pages/roles/RemoveRoles";
import PageNotFound from "../pages/notFound/NotFound";

const useRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      element: <PersistLogin />,
      children: [
        {
          element: <RequireAuth allowedRoles={[UserRoles.USER]} />,
          children: [
            {
              path: "/tasks",
              element: <Tasks />,
            },
            {
              path: "/addTask",
              element: <AddTask />,
            },
            {
              path: "/task/:taskId",
              element: <TaskPage />,
            },
            {
              path: "/taskNotFound/:taskId",
              element: <TaskNotFound />,
            },
            {
              path: "/editTask/:taskId",
              element: <EditTask />,
            },
          ],
        },
        {
          element: <RequireAuth allowedRoles={[UserRoles.ADMIN]} />,
          children: [
            {
              path: "/users",
              element: <UsersPage />,
            },
            {
              path: "/roles",
              element: <RolesPage />,
            },
            {
              path: "/roles/assignRoles",
              element: <AssignRoles />,
            },
            {
              path: "/roles/removeRoles",
              element: <RemoveRoles />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return router;
};

export default useRoutes;
