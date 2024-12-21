import { useCallback } from "react";
import Cookies from "js-cookie";
import { CookieAttributes } from "js-cookie";

const useCookies = () => {
  const setCookie = useCallback(
    (name: string, value: string, options?: CookieAttributes) => {
      Cookies.set(name, value, options);
    },
    []
  );

  const getCookie = useCallback((name: string): string | undefined => {
    return Cookies.get(name);
  }, []);

  const removeCookie = useCallback(
    (name: string, options?: CookieAttributes) => {
      Cookies.remove(name, options);
    },
    []
  );

  return {
    setCookie,
    getCookie,
    removeCookie,
  };
};

export default useCookies;
