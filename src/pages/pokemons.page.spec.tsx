import { render, screen } from "@testing-library/react";
import { useFetchInfinitePokemons } from "hooks/pokemon.hook";
import { Mock, vi } from "vitest";
import { PokemonsPage } from "./pokemons.page";

vi.mock("hooks/pokemon.hook", () => ({
  useFetchInfinitePokemons: vi.fn(),
}));

vi.mock("features/poke-list/poke-list", () => ({
  PokeList: vi.fn(({ names }) => (
    <div data-testid="poke-list">{names.join(", ")}</div>
  )),
}));

describe("PokemonsPage", () => {
  it("should render loading state", () => {
    (useFetchInfinitePokemons as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });

    render(<PokemonsPage />);

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("should render an empty list when no data is available", () => {
    (useFetchInfinitePokemons as Mock).mockReturnValue({
      data: { pages: [] },
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });

    render(<PokemonsPage />);

    expect(screen.queryByTestId("poke-list")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("poke-list-item")).toBeNull();
  });

  it("should render a list of Pokémon names", () => {
    (useFetchInfinitePokemons as Mock).mockReturnValue({
      data: {
        pages: [
          { results: [{ name: "pikachu" }, { name: "bulbasaur" }] },
          { results: [{ name: "charmander" }] },
        ],
      },
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
    });

    render(<PokemonsPage />);

    expect(screen.getByTestId("poke-list")).toHaveTextContent(
      "pikachu, bulbasaur, charmander",
    );
  });

  it("should render the end message when there are no more pages", () => {
    (useFetchInfinitePokemons as Mock).mockReturnValue({
      data: {
        pages: [{ results: [{ name: "pikachu" }] }],
      },
      isLoading: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
    });

    render(<PokemonsPage />);

    expect(screen.getByText("It is all, nothing more")).toBeInTheDocument();
  });
});
