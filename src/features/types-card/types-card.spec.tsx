import { render, screen } from "@testing-library/react";
import { IPokemon } from "types/pokemon.type";
import { TypesCard } from "./types-card";

vi.mock("./types-card-item", () => ({
  TypesCardItem: vi.fn(({ typeName }) => (
    <div data-testid="types-card-item">{typeName}</div>
  )),
}));

describe("TypesCard", () => {
  it("should render 'No types available' if types is undefined", () => {
    render(<TypesCard types={undefined} />);
    expect(screen.getByText("No types available")).toBeInTheDocument();
  });

  it("should render 'No types available' if types is an empty array", () => {
    render(<TypesCard types={[]} />);
    expect(screen.getByText("No types available")).toBeInTheDocument();
  });

  it("should render the heading 'Pokemon Types'", () => {
    render(<TypesCard types={[]} />);
    expect(
      screen.getByRole("heading", { name: "Pokemon Types" }),
    ).toBeInTheDocument();
  });

  it("should render a list of types", () => {
    const mockTypes: IPokemon["types"] = [
      { type: { name: "fire", url: "" }, slot: 1 },
      { type: { name: "water", url: "" }, slot: 2 },
    ];

    render(<TypesCard types={mockTypes} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByTestId("types-card-item")).toHaveLength(2);
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
  });
});
