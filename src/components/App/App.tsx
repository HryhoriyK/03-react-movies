import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";



export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSearch = async (searchTopic: string) => {
        try {
            setError(false);
            setIsLoading(true);
            setMovies([]);
            const data = await fetchMovies(searchTopic);

            if (data.results.length === 0) {
                toast("No movies found for your request.")
            }
            setMovies(data.results);
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
      };

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
      };
    
      function handleCloseModal() {
        setSelectedMovie(null);
    }   

    return (
        <div>
            <Toaster />
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {!isLoading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={handleMovieClick} />
            )}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
}