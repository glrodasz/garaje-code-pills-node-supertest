const fs = require('fs');

const loadMovies = () => {
  const data = fs.readFileSync('movies.json', 'utf8');
  return JSON.parse(data);
};

const generateId = (movies) => {
  return movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
};

const saveMovies = (movies) => {
  fs.writeFileSync('movies.json', JSON.stringify(movies));
};

module.exports = {
  loadMovies,
  generateId,
  saveMovies
};
