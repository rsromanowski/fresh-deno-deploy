import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { Avatar } from "../components/Avatar.tsx";
import { Button } from "../components/Button.tsx";

interface User {
  username: string;
  user_id: string;
  display_name: string;
  avatar: string;
}

interface League {
  "total_rosters": number;
  "status": string; // "pre_draft"; // can also be "drafting", "in_season", or "complete"
  "sport": string; // nfl
  // "settings": { settings object },
  "season_type": string; // "regular";
  "season": string; // "2018";
  // "scoring_settings": { scoring_settings object },
  // "roster_positions": [ roster positions array ],
  "previous_league_id": string; // "198946952535085056";
  "name": string; // "Sleeperbot Friends League";
  "league_id": string; // "289646328504385536";
  "draft_id": string; // "289646328508579840";
  "avatar": string; // "efaefa889ae24046a53265a3c71b8b64";
}

interface LeagueUser {
  "user_id": string;
  "username": string;
  "display_name": string;
  "avatar": string;
  "metadata": {
    "team_name": string;
  };
  "is_owner": boolean; // is commissioner (there can be multiple commissioners)
}

export default function Search() {
  const [username, setUsername] = useState("rsr16");
  const [user, setUser] = useState<User | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [leagueUsers, setLeagueUsers] = useState<LeagueUser[]>([]);

  const onInput = (
    { currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    setUsername(currentTarget.value);
  };

  return (
    <div>
      <input value={username} onInput={onInput} />
      <Button
        onClick={async () => {
          const getUserUrl = `https://api.sleeper.app/v1/user/${username}`;
          const response = await fetch(getUserUrl);
          const user = await response.json() as User;
          setUser(user);

          const getLeaguesUrl =
            `https://api.sleeper.app/v1/user/${user?.user_id}/leagues/nfl/2022`;

          const response2 = await fetch(getLeaguesUrl);
          const leagues = await response2.json() as League[];
          setLeagues(leagues);
        }}
      >
        Search
      </Button>

      {user && (
        <div>
          <Avatar avatar_id={user?.avatar!} />
          <span>{user.display_name}</span>
        </div>
      )}
      <ol>
        {leagues.map((league) => (
          <li>
            {league.name}
            <Button
              onClick={async () => {
                const getLeagueUsersUrl =
                  `https://api.sleeper.app/v1/league/${league.league_id}/users`;

                const response = await fetch(getLeagueUsersUrl);
                const leagueUsers = await response.json() as LeagueUser[];
                setLeagueUsers(leagueUsers);
              }}
            >
              More
            </Button>
          </li>
        ))}
      </ol>
      <ol>
        {leagueUsers.map((user) => (
          <li>{user.metadata.team_name ?? "--"} ({user.display_name})</li>
        ))}
      </ol>
    </div>
  );
}
