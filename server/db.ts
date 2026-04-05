import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@shared/schema";
import path from "path";

const sqlite = new Database(path.join(process.cwd(), "data.db"));
export const db = drizzle(sqlite, { schema });

// Create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    month TEXT NOT NULL,
    generated_at TEXT NOT NULL,
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS email_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    added_at TEXT NOT NULL
  );
`);

// Seed default subscriber if none exist
const count = sqlite.prepare("SELECT COUNT(*) as c FROM email_subscribers").get() as { c: number };
if (count.c === 0) {
  sqlite.prepare("INSERT OR IGNORE INTO email_subscribers (email, added_at) VALUES (?, ?)").run(
    "pradelg364@gmail.com",
    new Date().toISOString()
  );
}
