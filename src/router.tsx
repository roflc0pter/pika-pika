import { createRouter } from "@tanstack/react-router";
import { NotFound } from "./components/common/not-found";
import { UnexpectedError } from "./components/common/unexpect-error";
import rootRoute, { rootIndexRoute } from "./components/root/root.route";

const routeTree = rootRoute.addChildren([rootIndexRoute]);

export const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: ({ error }) => <UnexpectedError error={error} />,
  defaultNotFoundComponent: () => <NotFound />,
});
