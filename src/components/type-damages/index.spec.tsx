import { render, screen } from "@testing-library/react";
import { INamedAPIResource } from "types/named-api-resource.type";
import { TypeDamages } from ".";

vi.mock("features/type-logo", () => ({
  TypeLogo: vi.fn(({ typeName }) => (
    <div data-testid="type-logo">{typeName}</div>
  )),
}));

describe("TypeDamages", () => {
  it("should render the title", () => {
    render(<TypeDamages title="Test Title" typeResource={[]} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render 'No data available' if typeResource is undefined", () => {
    render(<TypeDamages title="No Data" typeResource={undefined} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("should render 'No data available' if typeResource is an empty array", () => {
    render(<TypeDamages title="No Types" typeResource={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("should render a list of type logos", () => {
    const mockTypes: INamedAPIResource[] = [
      { name: "fire", url: "" },
      { name: "water", url: "" },
    ];

    render(<TypeDamages title="Type Test" typeResource={mockTypes} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("fire")).toBeInTheDocument();
    expect(screen.getByText("water")).toBeInTheDocument();
  });
});
