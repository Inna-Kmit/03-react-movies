import { useState } from "react";
import { fetchMovies } from "../../services/movieService";

import { Movie } from "../../types/movie";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Loader from "../loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../movieGrid/MovieGrid";
import SearchBar from "../searchBar/SearchBar";
import MovieModal from "../movieModal/MovieModal";
import css from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setSelectedMovie(null);
    setIsError(false);
    try {
      setIsLoading(true);
      const data = await fetchMovies(query);

      if (data.length) {
        setMovies(data);
      } else {
        toast.error("No movies found for your request.");
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && !isLoading && <ErrorMessage />}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
