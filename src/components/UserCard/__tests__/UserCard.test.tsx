/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import * as Repos from "./../../../modules/Repos"
import UserCard from "./../";

jest.mock("./../../../modules/Repos")

const MOCK = [
  {
    name: "Repo 1",
    description: "Description 1",
    stargazers_count: 1,
  },
  {
    name: "Repo 2",
    description: "Description 2",
    stargazers_count: 2,
  },
];
describe("UserCard", () => {
  it("should render the username", () => {
    render(<UserCard username="testuser" />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("should toggle the list of repos when clicked", async () => {
    jest.spyOn(Repos, 'getReposByUsername').mockReturnValue(Promise.resolve(MOCK))
    render(<UserCard username="testuser" />);
    const chevron = screen.getByTestId("chevron");

    expect(screen.queryByText("Repo 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Repo 2")).not.toBeInTheDocument();

    fireEvent.click(chevron);

    await waitFor(() => {
      expect(chevron).toBeInTheDocument();
    });

    expect(screen.getByText("Repo 1")).toBeInTheDocument();
    expect(screen.getByText("Repo 2")).toBeInTheDocument();

    fireEvent.click(chevron);

    expect(screen.queryByText("Repo 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Repo 2")).not.toBeInTheDocument();
  });

  
  it("should show no results if repos is empty", async () => {
    jest.spyOn(Repos, 'getReposByUsername').mockReturnValue(Promise.resolve([]))
    render(<UserCard username="testuser" />);
    const chevron = screen.getByTestId("chevron");

    expect(screen.queryByText("No Results.")).not.toBeInTheDocument();

    fireEvent.click(chevron);

    await waitFor(() => {
      expect(chevron).toBeInTheDocument();
    });

    expect(screen.queryByText("No Results.")).toBeInTheDocument();
  });

  it("should show error if service is returning error", async () => {
    jest.spyOn(Repos, 'getReposByUsername').mockReturnValue(Promise.reject([]))
    render(<UserCard username="testuser" />);
    const chevron = screen.getByTestId("chevron");

    expect(screen.queryByText("Oops something went wrong")).not.toBeInTheDocument();

    fireEvent.click(chevron);

    await waitFor(() => {
      expect(chevron).toBeInTheDocument();
    });

    expect(screen.queryByText("Oops something went wrong")).toBeInTheDocument();
  });

  
});
