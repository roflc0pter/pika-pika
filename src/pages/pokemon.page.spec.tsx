import { useParams } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { useFetchPokemon } from "hooks/pokemon.hook";
import { Mock, vi } from "vitest";
import { PokemonPage } from "./pokemon.page";

vi.mock("hooks/pokemon.hook", () => ({
  useFetchPokemon: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useParams: vi.fn(),
}));

vi.mock("components/not-found", () => ({
  NotFound: vi.fn(({ title }) => <div data-testid="not-found">{title}</div>),
}));

vi.mock("features/poke-card", () => ({
  PokeCard: vi.fn(({ name }) => <div data-testid="poke-card">{name}</div>),
}));

vi.mock("features/types-card", () => ({
  TypesCard: vi.fn(() => <div data-testid="types-card">Types</div>),
}));

describe("PokemonPage", () => {
  it("should render NotFound if the Pokémon does not exist", () => {
    (useParams as Mock).mockReturnValue({ name: "missingno" });
    (useFetchPokemon as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<PokemonPage />);

    expect(screen.getByTestId("not-found")).toHaveTextContent(
      "missingno does not exist :(",
    );
  });

  it("should render Pokémon details when data is available", () => {
    (useParams as Mock).mockReturnValue({ name: "charizard" });
    (useFetchPokemon as Mock).mockReturnValue({
      data: { types: [{ type: { name: "fire" } }] },
      isLoading: false,
    });

    render(<PokemonPage />);

    expect(screen.getByTestId("poke-card")).toHaveTextContent("charizard");
    expect(screen.getByTestId("types-card")).toHaveTextContent("Types");
  });
});
