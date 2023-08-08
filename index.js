const express = require("express");
const movies = require("./routes/movies");

const app = express();
app.use(express.json());

movies(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
