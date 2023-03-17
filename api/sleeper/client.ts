import { LeagueUser } from "./types.ts";
import { League } from "./types.ts";
import { User } from "./types.ts";

export const Sleeper = {
  getUser: async (username: string) => {
    const getUserUrl = `https://api.sleeper.app/v1/user/${username}`;
    const response = await fetch(getUserUrl);
    return (await response.json()) as User;
  },

  getLeaguesForUser: async (user_id: string, year = "2022") => {
    const getLeaguesUrl = `https://api.sleeper.app/v1/user/${user_id}/leagues/nfl/${year}`;

    const response2 = await fetch(getLeaguesUrl);
    return (await response2.json()) as League[];
  },

  getLeagueUsers: async (league_id: string) => {
    const getLeagueUsersUrl = `https://api.sleeper.app/v1/league/${league_id}/users`;

    const response = await fetch(getLeagueUsersUrl);
    return (await response.json()) as LeagueUser[];
  },
};
