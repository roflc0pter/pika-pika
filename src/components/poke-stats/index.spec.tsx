import { render, screen } from "@testing-library/react";
import { IPokemon } from "types/pokemon.type";
import { PokeStats } from ".";

describe("PokeStats", () => {
  it("should render 'No stats available' if stats are undefined", () => {
    render(<PokeStats stats={undefined} />);
    expect(screen.getByText("No stats available")).toBeInTheDocument();
  });

  it("should render 'No stats available' if stats are an empty array", () => {
    render(<PokeStats stats={[]} />);
    expect(screen.getByText("No stats available")).toBeInTheDocument();
  });

  it("should render filtered stats with correct labels and values", () => {
    const mockStats = [
      { base_stat: 80, stat: { name: "hp", url: "" } },
      { base_stat: 100, stat: { name: "attack", url: "" } },
      { base_stat: 70, stat: { name: "defense", url: "" } },
      { base_stat: 120, stat: { name: "speed", url: "" } },
      { base_stat: 90, stat: { name: "special-attack", url: "" } },
    ] as IPokemon["stats"];

    render(<PokeStats stats={mockStats} />);

    expect(screen.getByText("HP:")).toBeInTheDocument();
    expect(screen.getByText("ATK:")).toBeInTheDocument();
    expect(screen.getByText("DEF:")).toBeInTheDocument();
    expect(screen.getByText("SPD:")).toBeInTheDocument();
    expect(screen.queryByText("special-attack")).not.toBeInTheDocument();

    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });
});
