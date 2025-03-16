import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import axios from "axios";

const handleGlobalError = (error: Error) => {
  if (axios.isAxiosError(error)) {
    return notification.error({
      message: "Request failed",
      description: error.response?.data?.message,
    });
  }

  notification.error({
    message: "Something went wrong",
    description: error.message,
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (
          axios.isAxiosError(error) &&
          error?.status &&
          error?.status >= 400 &&
          error?.status < 500
        ) {
          return false;
        }
        return failureCount < 5;
      },
    },
  },
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
});

export default queryClient;
