import { useState, useEffect } from "react";
import { DecodedToken } from "../types/authTypes.types";
import { AllowedRoles } from "../types/roles.types";

const useTokenValidation = (
  docodedToken: DecodedToken | null,
  allowedRoles: AllowedRoles[]
) => {
  const [isTokenValid, setIsTokenValid] = useState<boolean>(true);
  const [hasValidRoles, setHasValidRoles] = useState<boolean>(true);

  // const logout = useLogout();

  useEffect(() => {
    if (!docodedToken) {
      setIsTokenValid(false);
      setHasValidRoles(false);
      // logout();
      return;
    }

    try {
      const currentTime: number = Math.floor(Date.now() / 1000);

      const isExpired = (docodedToken?.exp as number) < currentTime;
      const rolesValid = docodedToken?.roles?.some((role) =>
        allowedRoles.includes(role)
      );
      if (isExpired || !rolesValid) {
        setIsTokenValid(false);
        setHasValidRoles(false);
        // logout();
      } else {
        setIsTokenValid(true);
        setHasValidRoles(true);
      }
    } catch (error) {
      console.log("sdh");
      // logout();
    }
  }, [docodedToken, allowedRoles]);

  return { isTokenValid, hasValidRoles };
};

export default useTokenValidation;
