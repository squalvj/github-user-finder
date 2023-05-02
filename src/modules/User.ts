type UsersPayload = {
  type: string;
  login: string;
};

export type UsersType = {
  username: string;
};

type queryUsers = {
  page: number;
  query: string;
  per_page: number;
};

export type UsersApi = {
  total_count: number;
  items: UsersType[]
}

export function transformUser(users: UsersPayload[]): UsersType[] {
  return users
    .filter((user) => user.type === "User")
    .map((user) => ({
      username: user.login,
    }));
}

export async function getUsers({
  query,
  page,
  per_page,
}: queryUsers): Promise<UsersApi> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    per_page: per_page.toString(),
  });
  const response = await fetch(`https://api.github.com/search/users?${params}`);
  const data = await response.json();
  const items = transformUser(data.items);
  return {
    total_count: data.total_count,
    items
  }
}
