import { useState, useEffect } from "react";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import useToast from "./useToast";
import { ErrorEnum } from "../constants/errorConstants";
import useAxiosPrivate from "./useAxiosPrivate";

interface UseFetchState<T> {
  data: T | null;
  error: any;
  isLoading: boolean;
}

function useFetch<T>(
  url: string,
  queryParams?: Record<string, string>,
  config?: AxiosRequestConfig
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const showToast = useToast();

  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  useEffect(() => {
    let isMounted: boolean = true;
    const fetchData = async () => {
      setState({ data: null, error: null, isLoading: true });

      try {
        let fullUrl: string = url;
        if (Object.keys(queryParams!).length > 0) {
          const queryString = new URLSearchParams(queryParams).toString();
          fullUrl = `${url}?${queryString}`;
        }

        const response: AxiosResponse<T> = await axiosPrivate(fullUrl, config);
        isMounted &&
          setState({
            data: response.data,
            error: null,
            isLoading: false,
          });
      } catch (error: any) {
        if (error?.message === ErrorEnum.NETWORK_ERROR) {
          showToast({
            message: error?.message,
            type: "error",
            options: { position: "bottom-left" },
          });
        }

        setState({ data: null, error: error, isLoading: false });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(queryParams), config]);

  return { data: state.data, error: state.error, isLoading: state.isLoading };
}

export default useFetch;
