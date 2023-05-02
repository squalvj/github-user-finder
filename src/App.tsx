import "./App.css";
import { useState } from "react";
import TextInput from "./components/TextField";
import Button from "./components/Button";
import UserCard from "./components/UserCard";
import { getUsers, UsersApi } from "./modules/User";
import Spinner from "./components/Spinner";
import ErrorComponent from "./components/ErrorComponent";
import ScrollTrigger from "./components/ScrollTrigger";

const DEFAULT_USERS = {
  total_count: 0,
  items: []
}

function App() {
  const [param, setParam] = useState({
    page: 1,
    query: "",
    per_page: 20,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersApi>(DEFAULT_USERS);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState(false);
  const [queryText, setQueryText] = useState("");

  const getUsersFn = async () => {
    setLoading(true);
    setError(false);
    setUsers(DEFAULT_USERS);
    setParam((prev) => ({
      ...prev,
      query: queryText,
      page: 1,
    }));
    try {
      const users = await getUsers({ ...param, query: queryText, page: 1 });
      setUsers(users);
      setParam((prev) => ({
        ...prev,
        query: queryText,
        page: prev.page + 1,
      }));
      setHasNext(true)
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
        page: prev.page + 1,
      }));
      setHasNext(true)
    } catch (_) {
      setError(true);
    }
    setLoading(false);
  };

  const paginateUsers = async () => {
    if (loading || error || !hasNext) return;

    setLoading(true);
    setError(false);
    try {
      const users = await getUsers({ ...param, page: param.page });
      setUsers((prev) => ({
        total_count: users.total_count,
        items: [...prev.items, ...users.items]
      }));
      setParam((prev) => ({
        ...prev,
        query: queryText,
        page: prev.page + 1,
      }));

      if (users.items.length === 0)
        setHasNext(false)

    } catch (_) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <div className="App bg-gray-100 flex items-center min-h-screen p-4 overflow-hidden">
      <div className="bg-white container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!queryText) return;
            getUsersFn();
          }}
        >
          <TextInput
            value={queryText}
            placeholder="Enter username"
            onChange={(e) => setQueryText(e)}
          />
          <div className="my-4">
            <Button type="submit">Search</Button>
          </div>
        </form>

        {users.items.length !== 0 && !loading && !error && !!param.query &&  (
          <p className="mb-4 text-left">Showing users for: "{param.query}"</p>
        )}

        {!loading && !error && users.items.length === 0 && !!param.query &&(
          <p className="mt-4">No Results.</p>
        )}

        <ScrollTrigger onTrigger={paginateUsers}>
          {users.items.length !== 0 &&
            users.items.map((user) => (
              <div className="mb-4">
                <UserCard username={user.username} />
              </div>
            ))}

          {loading && <Spinner />}

          {!loading && error && <ErrorComponent onClick={refetchUsers} />}
        </ScrollTrigger>
      </div>
    </div>
  );
}

export default App;
