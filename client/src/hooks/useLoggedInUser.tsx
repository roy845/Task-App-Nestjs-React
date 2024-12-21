import { useAuth } from "../context/auth";
import { DecodedToken } from "../types/authTypes.types";
import decodeToken from "../utils/decodeToken";

const useLoggedInUser = () => {
  const { auth } = useAuth();
  const decodedToken: DecodedToken | null = decodeToken<DecodedToken>(
    auth?.accessToken
  );

  return decodedToken;
};

export default useLoggedInUser;
