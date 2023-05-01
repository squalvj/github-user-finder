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

  return (
    <div className="App bg-gray-100 flex items-center min-h-screen p-4">
      <div className="bg-white container">
        <TextInput
          value={param.query}
          placeholder="Enter username"
          onChange={(e) => setParam((prev) => ({ ...prev, query: e }))}
        />
        <div className="my-4">
          <Button onClick={getUsersFn}>Search</Button>
        </div>

        {users.length !== 0 && !loading && !error && (
          <p className="mb-4 text-left">Showing users for: "{"test"}"</p>
        )}

        <div>
          {loading && <Spinner />}
          {users.length !== 0 &&
            !loading &&
            !error &&
            users.map((user) => <UserCard username={user.username} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
