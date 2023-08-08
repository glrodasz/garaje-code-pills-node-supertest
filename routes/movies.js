const express = require("express");
const { loadMovies, generateId, saveMovies } = require("../helpers");

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = (app) => app.use("/movies", router);

let movies = loadMovies();

function getMovies(req, res) {
  res.status(200).json(movies);
}

function getMovie(req, res) {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  saveMovies(movies);
  res.json(movies[movieIndex]);
}

function createMovie(req, res) {
  const newMovie = req.body;
  newMovie.id = generateId(movies);

  movies.push(newMovie);
  saveMovies(movies);

  res.status(201).json(newMovie);
}

function updateMovie(req, res) {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  Object.assign(movies[movieIndex], req.body);
  saveMovies(movies);

  res.status(200).json(movies[movieIndex]);
}

function deleteMovie(req, res) {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  saveMovies(movies);

  res.status(200).json({ success: true });
}
