export interface User {
  username: string;
  user_id: string;
  display_name: string;
  avatar: string;
}

export interface League {
  total_rosters: number;
  status: string; // "pre_draft"; // can also be "drafting", "in_season", or "complete"
  sport: string; // nfl
  // "settings": { settings object },
  season_type: string; // "regular";
  season: string; // "2018";
  // "scoring_settings": { scoring_settings object },
  // "roster_positions": [ roster positions array ],
  previous_league_id: string; // "198946952535085056";
  name: string; // "Sleeperbot Friends League";
  league_id: string; // "289646328504385536";
  draft_id: string; // "289646328508579840";
  avatar: string; // "efaefa889ae24046a53265a3c71b8b64";
}

export interface LeagueUser extends User {
  metadata: {
    team_name: string;
  };
  is_owner: boolean; // is commissioner (there can be multiple commissioners)
}
