// src/services/movieService.ts

import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string): Promise<{ results: Movie[] }> {
  if (!query.trim()) {
    throw new Error("Zadej hledaný výraz.");
  }

  try {
    const { data } = await axios.get<{ results: Movie[] }>(
      `${BASE_URL}/search/movie`,
      {
        params: {
          query,
          language: "en",
          include_adult: false,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.status_message || "Chyba při načítání filmů."
      );
    } else {
      throw new Error("Neočekávaná chyba při načítání.");
    }
  }
}