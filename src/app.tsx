import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { FC } from "react";
import queryClient from "./libs/query-client";
import { router } from "./routes/router";

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
