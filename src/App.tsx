import "./App.css";
import { useState } from "react";
import TextInput from "./components/TextField";
import Button from "./components/Button";
import UserCard from "./components/UserCard";
import { getUsers, UsersType } from "./modules/User";
import Spinner from "./components/Spinner";

function App() {
  const [param, setParam] = useState({
    page: 1,
    query: "",
    per_page: 10,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersType[]>([]);
  const [error, setError] = useState(false);

  const getUsersFn = async () => {
    setLoading(true);
    setError(false);
    setParam((prev) => ({
      ...prev,
      page: 1,
    }));
    try {
      const users = await getUsers({ ...param, page: 1 });
      setUsers(users);
      setParam((prev) => ({
        ...prev,
        page: prev.page++,
      }));
    } catch (_) {
      setError(true);
    }
    setLoading(false);
  };

  const refetchUsers = async () => {
    setLoading(true);
    setError(false);
    try {
      const users = await getUsers(param);
      setUsers(users);
      setParam((prev) => ({
        ...prev,
        page: prev.page++,
      }));
    } catch (_) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="App bg-gray-100 flex items-center min-h-screen p-4">
      <div className="bg-white container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getUsersFn();
          }}
        >
          <TextInput
            value={param.query}
            placeholder="Enter username"
            onChange={(e) => setParam((prev) => ({ ...prev, query: e }))}
          />
          <div className="my-4">
            <Button type="submit">Search</Button>
          </div>
        </form>

        {users.length !== 0 && !loading && !error && (
          <p className="mb-4 text-left">Showing users for: "{param.query}"</p>
        )}

        {!loading && error && (
          <>
            <p className="text-red-500">Oops something went wrong</p>
            <span onClick={refetchUsers} className="cursor-pointer underline">
              Click here to try again
            </span>
          </>
        )}

        <div className="overflow-y-auto min-h-[500px]">
          {loading && <Spinner />}
          {users.length !== 0 &&
            !loading &&
            !error &&
            users.map((user) => (
              <div className="mb-4">
                <UserCard username={user.username} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
