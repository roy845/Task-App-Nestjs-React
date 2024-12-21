import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignupDto,
} from "../types/auth-credentials.dto";
import { axiosInstance, axiosPrivate } from "./api";
import { API_URLS } from "./api-urls";
import { Auth, RefreshTokenResponse } from "../types/authTypes.types";
import { CreateTaskDto, CreateTaskReturn, Task } from "../types/taskTypes";
import { AllowedRoles } from "../types/roles.types";

export const signUp = (signupDto: SignupDto): Promise<{ data: string }> => {
  try {
    const { signup } = API_URLS;

    return axiosInstance.post(signup, signupDto);
  } catch (error) {
    throw error;
  }
};

export const login = (loginDto: LoginDto): Promise<{ data: Auth }> => {
  try {
    const { login } = API_URLS;

    return axiosInstance.post(login, loginDto, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const refreshToken = (): Promise<{ data: RefreshTokenResponse }> => {
  try {
    const { refreshToken } = API_URLS;

    return axiosInstance.get(refreshToken, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const logout = (): Promise<void> => {
  try {
    const { logout } = API_URLS;

    return axiosInstance.get(logout, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (
  forgotPasswordDto: ForgotPasswordDto
): Promise<{ data: string }> => {
  try {
    const { forgotPassword } = API_URLS;

    return axiosInstance.post(forgotPassword, forgotPasswordDto);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (
  resetPasswordDto: ResetPasswordDto
): Promise<{ data: string }> => {
  try {
    const { resetPassword } = API_URLS;

    return axiosInstance.post(resetPassword, resetPasswordDto);
  } catch (error) {
    throw error;
  }
};

export const checkTokenExpiration = (
  allowedRoles: AllowedRoles[]
): Promise<{ data: { isExpired: boolean; rolesValid: boolean } }> => {
  try {
    const { checkToken } = API_URLS;

    return axiosPrivate.post(checkToken, allowedRoles);
  } catch (error) {
    throw error;
  }
};

export const createTask = (
  createTaskDto: CreateTaskDto
): Promise<{ data: CreateTaskReturn }> => {
  try {
    const { createTask } = API_URLS;

    return axiosPrivate.post(createTask, createTaskDto);
  } catch (error) {
    throw error;
  }
};

export const deleteTask = (taskId: number): Promise<{ data: Task[] }> => {
  try {
    const { deleteTask } = API_URLS;

    return axiosPrivate.delete(`${deleteTask}/${taskId}`);
  } catch (error) {
    throw error;
  }
};

export const editTask = (
  task: Omit<Task, "id">,
  taskId: number
): Promise<{ data: { task: Task; message: string } }> => {
  try {
    const { editTask } = API_URLS;

    return axiosPrivate.put(`${editTask}/${taskId}`, task);
  } catch (error) {
    throw error;
  }
};
