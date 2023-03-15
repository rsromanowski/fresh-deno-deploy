import * as postgres from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const databaseUrl =
  Deno.env.get("DATABASE_URL") ?? config({ safe: true })["DATABASE_URL"];

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true);

export const db = {
  init: async () => {
    // Connect to the database
    const connection = await pool.connect();
    try {
      // Create the table
      await connection.queryObject`
			CREATE TABLE IF NOT EXISTS jokes (
			id SERIAL PRIMARY KEY,
			text TEXT NOT NULL
			)
		`;
    } finally {
      // Release the connection back into the pool
      connection.release();
    }
  },
  createJoke: async (joke: string) => {
    // Connect to the database
    const connection = await pool.connect();
    try {
      // Create the table
      await connection.queryObject`
		INSERT INTO jokes(text) VALUES(${joke});
	  `;
    } finally {
      // Release the connection back into the pool
      connection.release();
    }
  },
};
