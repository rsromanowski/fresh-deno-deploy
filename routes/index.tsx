import { Head } from "$fresh/runtime.ts";
import Search from "../islands/Search.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>SleeperGraph</title>
      </Head>
      <div>
        <p>
          Welcome to SleeperGraph. Enter a username and click search
        </p>
        <Search />
      </div>
    </>
  );
}
