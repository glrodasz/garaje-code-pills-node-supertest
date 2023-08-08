const express = require("express");
const { loadMovies, generateId, saveMovies } = require("./helpers");

const app = express();
app.use(express.json());

let movies = loadMovies();

app.get("/movies", (req, res) => {
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }
  
  res.json(movies[movieIndex]);
});

app.post("/movies", (req, res) => {
  const newMovie = req.body;
  newMovie.id = generateId(movies);
  movies.push(newMovie);
  saveMovies(movies);
  res.json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  Object.assign(movies[movieIndex], req.body);
  saveMovies(movies);
  res.json(movies[movieIndex]);
});

app.delete("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movieIndex = movies.findIndex((m) => m.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  movies.splice(movieIndex, 1);
  saveMovies(movies);
  res.json({ success: true });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
