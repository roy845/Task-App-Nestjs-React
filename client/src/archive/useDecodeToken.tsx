import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/authTypes.types";

const useDecodeToken = (token: string | undefined): DecodedToken | null => {
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

  if (!token) {
    setDecodedToken(null);
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    console.log(decoded);
    setDecodedToken(decoded);
  } catch (error) {
    console.error("Failed to decode token:", error);
    setDecodedToken(null);
    return null;
  }

  return decodedToken;
};

export default useDecodeToken;
