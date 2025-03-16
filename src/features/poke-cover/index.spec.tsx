import { render, screen } from "@testing-library/react";
import { IPokemon } from "types/pokemon.type";
import { vi } from "vitest";
import { PokeCover } from ".";

vi.mock("features/type-logo", () => ({
  TypeLogo: vi.fn(({ typeName }) => (
    <div data-testid="type-logo">{typeName}</div>
  )),
}));

describe("PokeCover", () => {
  const mockPokemon: IPokemon = {
    name: "pikachu",
    base_experience: 112,
    sprites: {
      other: {
        dream_world: { front_default: "https://example.com/pikachu.svg" },
      },
    },
    types: [{ type: { name: "electric", url: "" }, slot: 1 }],
  } as IPokemon;

  it("should render Pokémon name, image, and XP", () => {
    render(<PokeCover pokemon={mockPokemon} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Pikachu",
    );
    expect(
      screen.getByRole("img", { name: "Pokémon: Pikachu" }),
    ).toHaveAttribute("src", "https://example.com/pikachu.svg");
    expect(screen.getByText("112 XP")).toBeInTheDocument();
  });

  it("should render TypeLogo components", () => {
    render(<PokeCover pokemon={mockPokemon} />);

    expect(screen.getByTestId("type-logo")).toHaveTextContent("electric");
  });

  it("should handle missing Pokémon data gracefully", () => {
    render(<PokeCover pokemon={undefined} />);

    expect(
      screen.getByRole("img", { name: "Pokémon image" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeEmptyDOMElement();
  });

  it("should render in small size without XP and TypeLogo", () => {
    render(<PokeCover pokemon={mockPokemon} size="small" />);

    expect(screen.queryByText("112 XP")).not.toBeInTheDocument();
    expect(screen.queryByTestId("type-logo")).not.toBeInTheDocument();
  });
});
