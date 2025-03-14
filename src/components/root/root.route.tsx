import { createRootRoute, createRoute } from "@tanstack/react-router";
import { RootLayout } from "./root-layout";

const rootRoute = createRootRoute({
  component: RootLayout,
});

export const rootIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
});

export default rootRoute;
