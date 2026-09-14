import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";
import db from "../db/database.js";

beforeEach(() => {
  db.prepare("DELETE FROM movies").run();
});

test("POST /api/movies skapar en ny film", async () => {
  const movie = {
    title: "The Matrix",
    genre: "Action",
    director: "Lana Wachowski",
    year: 1999,
  };

  const response = await request(app).post("/api/movies").send(movie);

  assert.equal(response.status, 201);
  assert.equal(response.body.title, movie.title);
  assert.equal(response.body.genre, movie.genre);
  assert.equal(response.body.year, movie.year);
  assert.equal(response.body.director, movie.director);
});

test("GET /api/movies hämtar alla filmer", async () => {
  db.prepare(
    "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
  ).run("The Matrix", "Action", 1999, "Lana Wachowski");

  const response = await request(app).get("/api/movies");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.equal(response.body.length, 1);
  assert.equal(response.body[0].title, "The Matrix");
});

test("GET /api/movies kan filtrera på genre", async () => {
  db.prepare(
    "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
  ).run("The Matrix", "Action", 1999, "Lana Wachowski");

  db.prepare(
    "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
  ).run("Gladiator", "Drama", 2000, "Ridley Scott");

  const response = await request(app).get("/api/movies?genre=Action");

  assert.equal(response.status, 200);
  assert.equal(response.body.length, 1);
  assert.equal(response.body[0].title, "The Matrix");
});

test("PUT /api/movies/:id uppdatera en film", async () => {
  const result = db
    .prepare(
      "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
    )
    .run("The Matrix", "Action", 1999, "Lana Wachowski");

  const response = await request(app)
    .put(`/api/movies/${result.lastInsertRowid}`)
    .send({
      title: "The Matrix Reloaded",
      genre: "Action",
      year: 2003,
      director: "Lana Wachowski",
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.title, "The Matrix Reloaded");
  assert.equal(response.body.year, 2003);
});

test("DELETE /api/movies/:id radera en film", async () => {
  const result = db
    .prepare(
      "INSERT INTO movies (title, genre, year, director) VALUES (?, ?, ?, ?)",
    )
    .run("The Matrix", "Action", 1999, "Lana Wachowski");

  const response = await request(app).delete(
    `/api/movies/${result.lastInsertRowid}`,
  );

  assert.equal(response.status, 204);

  const movies = db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .get(result.lastInsertRowid);

  assert.equal(movies, undefined);
});
