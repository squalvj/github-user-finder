import { render, screen } from "@testing-library/react";
import RepoCard from "../index";

const MOCK_REPO = {
    description: "This is description",
    title: "This is title",
    total_star: 123
}

describe("Repocard", () => {
  it("Should render children correctly", () => {
    render(<RepoCard  description={MOCK_REPO.description} title={MOCK_REPO.title} totalStar={MOCK_REPO.total_star} />);

    expect(screen.getByText(MOCK_REPO.description)).toBeInTheDocument();
    expect(screen.getByText(MOCK_REPO.title)).toBeInTheDocument();
    expect(screen.getByText(MOCK_REPO.total_star)).toBeInTheDocument();
  });
});
