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

router.get("/", (req, res) => {
  try {
    const { genre } = req.query;

    let movies;
    if (genre) {
      movies = db.prepare("SELECT * FROM movies WHERE genre = ?").all(genre);
    } else {
      movies = db.prepare("SELECT * FROM movies").all();
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, year, director } = req.body;

    const result = db
      .prepare(
        "UPDATE movies SET title = ?, genre = ?, year = ?, director = ? WHERE id = ?",
      )
      .run(title, genre, year, director, id);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const movie = db
      .prepare("SELECT * FROM movies WHERE id = ?")
      .get(id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare("DELETE FROM movies WHERE id = ?")
    .run(id);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
    } catch (error) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
