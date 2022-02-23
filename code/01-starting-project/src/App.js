import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await fetch(
        "https://react-movies-e1fef-default-rtdb.firebaseio.com/movies.json"
      );

      console.log("ok", response.ok);
      console.log("status", response.status);

      if (!response.ok) {
        console.log("ok", response.ok);
        console.log("status", response.status);
        throw new Error("There is something wronge!");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((m) => ({
        id: m.episode_id,
        title: m.title,
        openingText: m.opening_crawl,
        releseData: m.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  let content = <p>Found no Movies.</p>;
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
