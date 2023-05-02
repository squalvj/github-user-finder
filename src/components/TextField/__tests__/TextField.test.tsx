import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./../index";

describe("TextInput", () => {
  it("renders correctly with default props", () => {
    render(
      <TextInput value="" onChange={() => {}} />
    );
    const inputElement = screen.getByPlaceholderText("Enter value...");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("renders correctly with custom placeholder text", () => {
    render(
      <TextInput
        placeholder="Custom placeholder"
        value=""
        onChange={() => {}}
      />
    );
    const inputElement = screen.getByPlaceholderText("Custom placeholder");

    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange handler correctly", () => {
    const handleChange = jest.fn();
    render(
      <TextInput value="" onChange={handleChange} />
    );
    const inputElement = screen.getByPlaceholderText("Enter value...");

    fireEvent.change(inputElement, { target: { value: "hello" } });

    expect(handleChange).toHaveBeenCalledWith("hello");
  });
});
