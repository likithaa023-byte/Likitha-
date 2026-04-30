// 1. Create a watchlist collection and insert one movie
db.watchlist.insertOne({
  movie_id: "MV001",
  title: "The Matrix",
  genre: "Sci-Fi",
  release_year: 1999,
  imdb_rating: 8.7,
  watched: true
});

// 2. Insert 5 movies with different genres
db.watchlist.insertMany([
  { movie_id: "MV002", title: "Dune", genre: "Sci-Fi", release_year: 2021, imdb_rating: 8.0, watched: false },
  { movie_id: "MV003", title: "The Godfather", genre: "Crime", release_year: 1972, imdb_rating: 9.2, watched: true },
  { movie_id: "MV004", title: "Spirited Away", genre: "Animation", release_year: 2001, imdb_rating: 8.6, watched: false },
  { movie_id: "MV005", title: "Parasite", genre: "Thriller", release_year: 2019, imdb_rating: 8.5, watched: true },
  { movie_id: "MV006", title: "Knives Out", genre: "Mystery", release_year: 2019, imdb_rating: 7.9, watched: false }
]);

// 3. Retrieve all movies where watched is false
db.watchlist.find({ watched: false });

// 4. Display only title, genre, and imdb_rating
db.watchlist.find({}, { title: 1, genre: 1, imdb_rating: 1, _id: 0 });

// 5. Delete a movie based on movie_id
db.watchlist.deleteOne({ movie_id: "MV001" });
