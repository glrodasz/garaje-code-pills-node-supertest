const express = require("express");
const router = require("./routes/movies");

const app = express();
app.use(express.json());

app.use("/movies", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
