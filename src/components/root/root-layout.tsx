import { Outlet } from "@tanstack/react-router";
import { Affix, Layout, theme } from "antd";
import { FC } from "react";

export const RootLayout: FC = () => {
  const {
    token: { padding },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Affix>
        <Layout.Header>Pokemon</Layout.Header>
      </Affix>
      <Layout.Content style={{ padding: padding }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
