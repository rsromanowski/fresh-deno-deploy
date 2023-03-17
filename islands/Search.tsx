import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { League, LeagueUser, User } from "../api/sleeper/types.ts";
import { Avatar } from "../components/Avatar.tsx";
import { Button } from "../components/Button.tsx";
import { Sleeper } from "../api/sleeper/client.ts";
import { UserCard } from "../components/UserCard.tsx";

export default function Search() {
  const [username, setUsername] = useState("rsr16");
  const [user, setCurrentUser] = useState<User | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [leagueUsers, setLeagueUsers] = useState<LeagueUser[]>([]);

  const [userMap, setUserMap] = useState<Map<string, User>>(new Map());
  const [leagueMap, setLeagueMap] = useState<Map<string, League>>(new Map());

  function saveUser(user: User) {
    setUserMap(userMap.set(user.user_id, user));
  }
  async function saveCurrentUser(user: User) {
    setCurrentUser(user);

    const leagues = await Sleeper.getLeaguesForUser(user.user_id);
    leagues.forEach((l) => saveLeague(l));
    setLeagues(leagues);
  }

  function saveLeague(league: League) {
    setLeagueMap(leagueMap.set(league.league_id, league));
  }

  const onInput = (
    { currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    setUsername(currentTarget.value);
  };

  return (
    <div
      style={{
        display: "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(320px, 1fr))",
        //"grid-template-columns": "minmax(300px, 20%) 20% 20% 20% 20%",
      }}
    >
      <div>
        {user && <UserCard user={user} saveCurrentUser={saveCurrentUser} />}

        <input value={username} onInput={onInput} />

        <Button
          onClick={async () => {
            // Clear maps on new search
            setUserMap(new Map());
            setLeagueMap(new Map());
            setLeagueUsers([]);

            const user = await Sleeper.getUser(username);
            saveCurrentUser(user);
            saveUser(user);
          }}
        >
          Search
        </Button>
      </div>

      <div>
        <ol>
          {leagues.map((league) => (
            <li>
              {league.name}
              <Button
                onClick={async () => {
                  const leagueUsers = await Sleeper.getLeagueUsers(
                    league.league_id,
                  );
                  leagueUsers.forEach((u) => saveUser(u));
                  setLeagueUsers(leagueUsers);
                }}
              >
                More
              </Button>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <ol>
          {leagueUsers.map((user) => (
            <li>{user.metadata.team_name ?? "--"} ({user.display_name})</li>
          ))}
        </ol>
      </div>

      <div>
        <ol>
          {[...userMap.entries()].map(([_, user]) => (
            <li>
              <UserCard user={user} saveCurrentUser={saveCurrentUser} />
            </li>
          ))}
        </ol>
      </div>
      {
        /* <div>
        <ol>
          {[...leagueMap.entries()].map(([id, league]) => (
            <li>{league.name} ({id})</li>
          ))}
        </ol>
      </div> */
      }
    </div>
  );
}
