export type Repo = {
  name: string;
  stargazers_count: number;
  description: string;
};

export async function getReposByUsername(username: string): Promise<Repo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await response.json();
  return data;
}
