const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
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

  app.get("/profile", async (req, res) => {
    const profile = await db.get("SELECT * FROM profile LIMIT 1");
    res.json(profile || { message: "No profile found" });
  });

  app.post("/profile", async (req, res) => {
    const { name, email, bio, skills } = req.body;
    await db.run(
      "INSERT INTO profile (name, email, bio, skills) VALUES (?, ?, ?, ?)",
      [name, email, bio, skills]
    );
    res.json({ status: "saved" });
  });

  const PORT = 5000;
  app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
})();
