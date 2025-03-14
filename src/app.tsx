import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import { FC } from "react";
import queryClient from "./context/query-client";
import { router } from "./router";
import "antd/dist/reset.css";

const App: FC = () => {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        components: {
          Layout: {
            headerBg: "#FDFFFC",
          },
        },
      }}
    >
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;
