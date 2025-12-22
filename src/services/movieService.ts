import axios from "axios";
import { Movie } from "../types/movie";

interface MovieHttpResponse {
  readonly VITE_TMDB_TOKEN: string;
  page: number;
  results: Movie[];
  total_pages: number;
}
const BASE_URL = "https://api.themoviedb.org/3";
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const MY_KEY = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<MovieHttpResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${MY_KEY}`,
      },
    }
  );
  return response.data.results;
};
