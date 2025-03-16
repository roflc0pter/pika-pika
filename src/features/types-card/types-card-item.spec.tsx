import { render, screen, within } from "@testing-library/react";
import { useFetchType } from "hooks/type.hook";
import { Mock, vi } from "vitest";
import { TypesCardItem } from "./types-card-item";

vi.mock("hooks/type.hook", () => ({
  useFetchType: vi.fn(),
}));

vi.mock("features/type-logo", () => ({
  TypeLogo: vi.fn(({ typeName }) => (
    <div data-testid="type-logo">{typeName}</div>
  )),
}));

vi.mock("components/type-damages", () => ({
  TypeDamages: vi.fn(({ title }) => (
    <div data-testid="type-damage">{title}</div>
  )),
}));

vi.mock("features/poke-list", () => ({
  PokeList: vi.fn(({ names }) => (
    <div data-testid="poke-list">{names.join(", ")}</div>
  )),
}));

describe("TypesCardItem", () => {
  it("should render loading state", () => {
    (useFetchType as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetched: false,
    });

    render(<TypesCardItem typeName="fire" />);

    expect(screen.getByTestId("type-logo")).toHaveTextContent("fire");
    expect(
      document.querySelector(".ant-card-body .ant-skeleton"),
    ).toBeInTheDocument();
  });

  it("should render 'No data available' if data is missing after fetch", () => {
    (useFetchType as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetched: true,
    });

    render(<TypesCardItem typeName="fire" />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("should render damage relations and same type Pokémon list", () => {
    (useFetchType as Mock).mockReturnValue({
      data: {
        damage_relations: {
          double_damage_to: [{ name: "grass", url: "" }],
          double_damage_from: [{ name: "water", url: "" }],
          half_damage_from: [{ name: "bug", url: "" }],
          no_damage_from: [{ name: "ground", url: "" }],
        },
        pokemon: [
          { pokemon: { name: "charizard" } },
          { pokemon: { name: "flareon" } },
        ],
      },
      isLoading: false,
      isFetched: true,
    });

    render(<TypesCardItem typeName="fire" />);

    expect(screen.getByTestId("type-logo")).toHaveTextContent("fire");

    const damages = screen.getAllByTestId("type-damage");
    expect(within(damages[0]).getByText("Strong Against")).toBeInTheDocument();
    expect(within(damages[1]).getByText("Weak Against")).toBeInTheDocument();
    expect(within(damages[2]).getByText("Resistant To")).toBeInTheDocument();
    expect(within(damages[3]).getByText("No Effect From")).toBeInTheDocument();
    expect(screen.getByTestId("poke-list")).toHaveTextContent(
      "charizard, flareon",
    );
  });
});
