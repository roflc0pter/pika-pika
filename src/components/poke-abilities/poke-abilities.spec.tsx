import { render, screen } from "@testing-library/react";
import { IPokemon } from "types/pokemon.type";
import { PokeAbilities } from "./poke-abilities";

vi.mock("./poke-ability", () => ({
  PokeAbility: vi.fn(() => <div data-testid="poke-ability" />),
}));

describe("PokeAbilities", () => {
  it("should render 'No abilities' if pokeAbilities is undefined", () => {
    render(<PokeAbilities pokeAbilities={undefined} />);
    expect(screen.getByText("No abilities")).toBeInTheDocument();
  });

  it("should render 'No abilities' if pokeAbilities is an empty array", () => {
    render(<PokeAbilities pokeAbilities={[]} />);
    expect(screen.getByText("No abilities")).toBeInTheDocument();
  });

  it("should render a list of abilities", () => {
    const mockAbilities: IPokemon["abilities"] = [
      {
        ability: {
          name: "overgrow",
          url: "https://pokeapi.co/api/v2/ability/1/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "chlorophyll",
          url: "https://pokeapi.co/api/v2/ability/2/",
        },
        is_hidden: true,
        slot: 3,
      },
    ];

    render(<PokeAbilities pokeAbilities={mockAbilities} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByTestId("poke-ability")).toHaveLength(2);
  });
});
