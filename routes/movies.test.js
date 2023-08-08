const testServer = require("../utils/testServer");
const movies = require("./movies");

const request = testServer(movies);

jest.mock("../helpers", () => ({
  loadMovies: jest.fn(() => ["movie1", "movie2"]),
}));

describe("[ routes / movies]", () => {
  it("should return a response with status 200", async () => {
    // Arrange
    const expected = 200;

    // Act
    const { status: result } = await request.get("/movies");

    // Assert
    expect(result).toEqual(expected);
  });

  it("should return all movies", async () => {
    // Arrange
    const expected = ["movie1", "movie2"];

    // Act
    const { body: result } = await request.get("/movies");

    // Assert
    expect(result).toEqual(expected);
  });
});