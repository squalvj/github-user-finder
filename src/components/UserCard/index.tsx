import { useState } from "react";
import Spinner from "../Spinner";
import RepoCard from "../RepoCard";
import { getReposByUsername, Repo } from "../../modules/Repos";
import ErrorComponent from "../ErrorComponent";

const Chevron = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    ></path>
  </svg>
);

type Props = {
  username: string;
};

const UserCard: React.FC<Props> = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState(false);
  const [didSearch, setDidSearch] = useState(false);

  const handleClick = async () => {
    setOpen((prev) => !prev);
    if (repos.length !== 0) return;

    setLoading(true);
    setError(false);

    try {
      const reposData = await getReposByUsername(username);
      setDidSearch(true);
      setRepos(reposData);
    } catch (_) {
      setError(true);
    }

    setLoading(false);
  };

  const handleRefetch = async () => {
    setLoading(true);
    setError(false);

    try {
      const reposData = await getReposByUsername(username);
      setDidSearch(true);
      setRepos(reposData);
    } catch (_) {
      setError(true);
    }

    setLoading(false);
  };

  const ulClass = [
    open ? "max-h-[3000px]" : "max-h-[0px]",
    "overflow-hidden",
    "transition-all",
  ];

  return (
    <>
      <div
        className="bg-[#f2f2f2] text-black flex justify-between items-center p-2 border-gray-50 cursor-pointer"
        onClick={handleClick}
      >
        <label>{username}</label>
        <span className={`${open ? "rotate-180" : ""}`}>
          <Chevron />
        </span>
      </div>
      <ul className={ulClass.join(" ")}>
        {loading && open && (
          <div className="my-4">
            <Spinner />
          </div>
        )}

        {!error && didSearch && repos.length === 0 && (
          <p className="mt-4">No Results.</p>
        )}

        {error && !loading && <ErrorComponent onClick={handleRefetch} />}

        {!loading && open && (
          <li className="pl-4">
            {repos.map((repo, i) => (
              <div className="mt-3">
                <RepoCard
                  description={repo.description}
                  title={repo.name}
                  totalStar={repo.stargazers_count}
                  key={i}
                />
              </div>
            ))}
          </li>
        )}
      </ul>
    </>
  );
};

export default UserCard;
