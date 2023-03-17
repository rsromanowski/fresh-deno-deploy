import { Avatar } from "./Avatar.tsx";
import { User } from "../api/sleeper/types.ts";

interface UserCardProps {
  user: User;
  saveCurrentUser: (user: User) => void;
}

export function UserCard({ user, saveCurrentUser }: UserCardProps) {
  return (
    <div>
      <Avatar avatar_id={user?.avatar!} />
      <span
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        onClick={() => saveCurrentUser(user)}
      >
        {user.display_name}
      </span>
    </div>
  );
}
