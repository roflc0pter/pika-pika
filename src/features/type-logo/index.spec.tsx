import { render, screen } from "@testing-library/react";
import { useFetchType } from "hooks/type.hook";
import { Mock, vi } from "vitest";
import { TypeLogo } from ".";

vi.mock("hooks/type.hook", () => ({
  useFetchType: vi.fn(),
}));

describe("TypeLogo", () => {
  it("should render the capitalized type name if no icon URL is available", () => {
    (useFetchType as Mock).mockReturnValue({ data: undefined });

    render(<TypeLogo typeName="fire" />);
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("should render the type icon if available", () => {
    (useFetchType as Mock).mockReturnValue({
      data: {
        sprites: {
          "generation-vi": {
            "x-y": {
              name_icon: "https://example.com/fire-icon.png",
            },
          },
        },
      },
    });

    render(<TypeLogo typeName="fire" />);

    const img = screen.getByRole("img", { name: "Pokémon type: fire" });
    expect(img).toHaveAttribute("src", "https://example.com/fire-icon.png");
  });
});
