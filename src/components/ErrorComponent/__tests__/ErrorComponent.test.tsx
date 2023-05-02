import { render, screen, fireEvent } from "@testing-library/react";
import ErrorComponent from "../index";

describe("ErrorComponent", () => {
  it("Should render children correctly", () => {
    render(<ErrorComponent onClick={() => {}}/>);

    expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
  });

  it("should execute onClick", () => {
    const fn = jest.fn();
    render(<ErrorComponent onClick={fn}/>);
    const buttonElement = screen.getByText("Click here to try again");

    expect(screen.getByText("Oops something went wrong")).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
