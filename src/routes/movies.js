import express from "express";
import db from "../db/database.js";

const router = express.Router();
router.post("/", (req, res) => {
  try {
    const { title, genre, year, director } = req.body;
    const result = db
      .prepare(
        "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
      )
      .run(title, genre, year, director);

    const movie = db
      .prepare("SELECT * FROM movies WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
