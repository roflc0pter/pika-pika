import { createRouter } from "@tanstack/react-router";
import { NotFound } from "components/not-found";
import { UnexpectedError } from "components/unexpect-error";
import pokemonRoutes from "./pokemon.route";
import rootRoute, { rootIndexRoute } from "./root.route";

const routeTree = rootRoute.addChildren([
  rootIndexRoute.addChildren([pokemonRoutes]),
]);

export const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: ({ error }) => <UnexpectedError error={error} />,
  defaultNotFoundComponent: () => <NotFound />,
});
