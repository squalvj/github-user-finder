import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../index";

describe("Button", () => {
  it("Should render children correctly", () => {
    render(<Button>This is button</Button>);

    expect(screen.getByText("This is button")).toBeInTheDocument();
  });

  it("should render primary by default", () => {
    render(<Button>This is button</Button>);
    const buttonElement = screen.getByText("This is button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("primary");
  });

  it("should render secondary button if props is passed", () => {
    render(<Button variant="SECONDARY">This is button</Button>);
    const buttonElement = screen.getByText("This is button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("secondary");
  });

  it('should execute onClick', () => {
    const fn = jest.fn()
    render(<Button onClick={fn}>This is button</Button>);
    const buttonElement = screen.getByText("This is button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should disabled if the disabled is passed', () => {
    render(<Button disabled>This is button</Button>);
    const buttonElement = screen.getByText("This is button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled()
  });
});
