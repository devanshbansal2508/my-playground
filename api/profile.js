import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async function handler(req, res) {
  const db = await open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      bio TEXT,
      skills TEXT
    )
  `);

  if (req.method === "GET") {
    const profile = await db.get("SELECT * FROM profile LIMIT 1");
    res.status(200).json(profile || { message: "No profile found" });
  } else if (req.method === "POST") {
    const { name, email, bio, skills } = req.body;
    await db.run(
      "INSERT INTO profile (name, email, bio, skills) VALUES (?, ?, ?, ?)",
      [name, email, bio, skills]
    );
    res.status(200).json({ status: "saved" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
