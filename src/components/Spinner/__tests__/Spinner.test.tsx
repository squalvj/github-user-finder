import { render, screen } from "@testing-library/react";
import Spinner from "../index";

describe("Spinner", () => {
  it("Should render children correctly", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toHaveStyle({ borderTopColor: "rgb(0, 0, 0" });
  });

  it("Should render with choosen color", () => {
    const color = "rgb(255, 255, 255)"
    render(<Spinner color={color} />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toHaveStyle(`border-top-color: ${color}`)
  });
});
