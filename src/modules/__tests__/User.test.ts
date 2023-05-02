import { transformUser } from "./../User";
import { UsersType } from "./../User";

describe("transformUser", () => {
  it("transforms an array of UsersPayload into an array of UsersType", () => {
    const usersPayload = [
      { type: "User", login: "user1" },
      { type: "Organization", login: "org1" },
      { type: "User", login: "user2" },
      { type: "User", login: "user3" },
      { type: "Organization", login: "org2" },
    ];
    const expectedUsers: UsersType[] = [
      { username: "user1" },
      { username: "user2" },
      { username: "user3" },
    ];
    const actualUsers = transformUser(usersPayload);
    expect(actualUsers).toEqual(expectedUsers);
  });
});
