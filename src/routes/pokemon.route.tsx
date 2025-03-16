import { createRoute } from "@tanstack/react-router";
import { rootIndexRoute } from "routes/root.route";
import { PokemonPage } from "pages/pokemon.page";
import { PokemonsPage } from "pages/pokemons.page";

export const pokemonsRoute = createRoute({
  getParentRoute: () => rootIndexRoute,
  path: "pokemons",
});

export const pokemonsIndexRoute = createRoute({
  getParentRoute: () => pokemonsRoute,
  path: "/",
  component: PokemonsPage,
});

export const pokemonRoute = createRoute({
  getParentRoute: () => pokemonsRoute,
  path: "$name",
  component: PokemonPage,
});

const pokemonRoutes = pokemonsRoute.addChildren([
  pokemonsIndexRoute,
  pokemonRoute,
]);

export default pokemonRoutes;
