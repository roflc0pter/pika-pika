import { render, screen } from "@testing-library/react";
import { useFetchAbility } from "hooks/ability.hook";
import { IAbility } from "types/ability.type";
import { IPokemonAbility } from "types/pokemon.type";
import { Mock, vi } from "vitest";
import { PokeAbility } from "./poke-ability";

vi.mock("hooks/ability.hook", () => ({
  useFetchAbility: vi.fn(),
}));

describe("PokeAbility", () => {
  const mockPokeAbility = {
    ability: { name: "overgrow", url: "https://pokeapi.co/api/v2/ability/1/" },
  } as IPokemonAbility;

  const mockAbilityData = {
    id: 1,
    name: "overgrow",
    names: [{ language: { name: "en", url: "" }, name: "Overgrow" }],
    effect_entries: [
      {
        effect: "Powers up Grass-type moves when HP is low.",
        short_effect: "Boosts Grass moves at low HP.",
        language: { name: "en", url: "" },
      },
    ],
    flavor_text_entries: [
      {
        flavor_text: "Boosts Grass moves.",
        language: { name: "en", url: "" },
        version_group: { name: "ruby-sapphire", url: "" },
      },
    ],
  } as IAbility;

  it("should render ability name, tooltip, and flavor text", async () => {
    (useFetchAbility as Mock).mockReturnValue({
      data: mockAbilityData,
    });

    render(<PokeAbility pokeAbility={mockPokeAbility} />);

    expect(screen.getByText("Overgrow")).toBeInTheDocument();
    expect(screen.getByText("Boosts Grass moves.")).toBeInTheDocument();
  });

  it("should not render anything if ability data is undefined", () => {
    (useFetchAbility as Mock).mockReturnValue({ data: undefined });

    render(<PokeAbility pokeAbility={mockPokeAbility} />);

    expect(screen.queryByText(/Overgrow/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Boosts Grass moves/)).not.toBeInTheDocument();
  });

  it("should handle missing effect and flavor text", () => {
    const partialAbilityData: IAbility = {
      ...mockAbilityData,
      effect_entries: [],
      flavor_text_entries: [],
    };

    (useFetchAbility as Mock).mockReturnValue({
      data: partialAbilityData,
    });

    render(<PokeAbility pokeAbility={mockPokeAbility} />);

    expect(screen.getByText("Overgrow")).toBeInTheDocument();
    expect(screen.queryByText(/Boosts Grass moves./)).not.toBeInTheDocument();
  });
});
