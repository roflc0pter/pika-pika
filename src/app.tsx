import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { App as AntdApp, ConfigProvider, Grid } from "antd";
import "antd/dist/reset.css";
import { FC } from "react";
import queryClient from "./libs/query-client";
import { router } from "./routes/router";

const App: FC = () => {
  const screens = Grid.useBreakpoint();

  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
        token: {
          sizeUnit: screens.md ? 4 : 2,
        },
        components: {
          Layout: {
            headerBg: "#FDFFFC",
            headerHeight: screens.md ? 64 : 42,
            headerPadding: screens.md ? 24 : 12,
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
