import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/authTypes.types";
import { AllowedRoles } from "../types/roles.types";

interface TokenValidationResult {
  decodedToken: DecodedToken | null;
  isExpired: boolean;
  rolesValid: boolean;
}

const decodeAndValidateToken = (
  token: string | undefined,
  allowedRoles?: AllowedRoles[]
): TokenValidationResult => {
  if (!token) {
    return {
      decodedToken: null,
      isExpired: false,
      rolesValid: false,
    };
  }

  try {
    const decodedToken: DecodedToken | null = token
      ? jwtDecode<DecodedToken>(token)
      : null;
    const currentTime: number = Math.floor(Date.now() / 1000);
    const isExpired: boolean = (decodedToken?.exp as number) < currentTime;
    const rolesValid: boolean =
      decodedToken?.roles?.some((role) => allowedRoles?.includes(role)) ??
      false;

    return {
      decodedToken,
      isExpired,
      rolesValid,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return {
      decodedToken: null,
      isExpired: false,
      rolesValid: false,
    };
  }
};

export default decodeAndValidateToken;
