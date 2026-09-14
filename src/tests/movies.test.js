import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("POST /api/movies skapar en ny film", async () => {
  const movie = {
    title: "The Matrix",
    genre: "Action",
    director: "Lana Wachowski",
    year: 1999,
  };

  const response = await request(app)
    .post("/api/movies")
    .send(movie)

  assert.equal(response.status, 201);
  assert.equal(response.body.title, movie.title);
  assert.equal(response.body.genre, movie.genre);
  assert.equal(response.body.year, movie.year);
  assert.equal(response.body.director, movie.director);
});
