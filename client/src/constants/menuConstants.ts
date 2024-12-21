import { menuItemsType } from "../types/menuItems.types";

export const HOME_NAME: string = "Home";
export const HOME_LINK: string = "/tasks";

export const ADD_TASK_NAME: string = "Add Task";
export const ADD_TASK_LINK: string = "/addTask";

export const USERS_NAME: string = "Users";
export const USERS_LINK: string = "/users";

export const ROLES_NAME: string = "Roles";
export const ROLES_LINK: string = "/roles";

export const menuItems: menuItemsType[] = [
  {
    name: HOME_NAME,
    href: HOME_LINK,
  },
  {
    name: ADD_TASK_NAME,
    href: ADD_TASK_LINK,
  },
  {
    name: USERS_NAME,
    href: USERS_LINK,
  },
  {
    name: ROLES_NAME,
    href: ROLES_LINK,
  },
];
