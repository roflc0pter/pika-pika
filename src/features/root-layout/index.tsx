import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { Affix, Button, Flex, Layout, theme, Typography } from "antd";
import { capitalizeFirstLetter } from "libs/utils";
import { FC } from "react";

export const RootLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    token: { padding },
  } = theme.useToken();

  if (location.pathname === "/") {
    navigate({ to: "/pokemons", replace: true });
    return null;
  }

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isSubpage = pathSegments.length > 1;
  const pageTitle = capitalizeFirstLetter(
    pathSegments[pathSegments.length - 1],
  );

  console.log("pageTitle", pageTitle);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Affix>
        <Layout.Header>
          <Flex align="center" gap={"large"} style={{ height: "100%" }}>
            {isSubpage && (
              <nav>
                <Button
                  aria-label="Go Back"
                  size="large"
                  shape="circle"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate({ to: "/pokemons" })}
                />
              </nav>
            )}
            <Typography.Title level={3} style={{ margin: 0 }}>
              {pageTitle}
            </Typography.Title>
          </Flex>
        </Layout.Header>
      </Affix>
      <Layout.Content style={{ padding: padding }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
