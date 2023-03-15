import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

function avatarUrl(avatar_id: string): string {
  return `https://sleepercdn.com/avatars/thumbs/${avatar_id}`;
}

export function Avatar(
  props: JSX.HTMLAttributes<HTMLImageElement> & { avatar_id: string },
) {
  return (
    <img
      style="border-radius: 50%"
      src={avatarUrl(props.avatar_id)}
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  );
}
