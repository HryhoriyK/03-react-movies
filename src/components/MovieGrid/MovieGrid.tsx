import type { Movie } from "../../types/movie";
import css from "../MovieGrid/MovieGrid.module.css";

interface MovieGridProps {
    items: Movie[];
    onMovieClick: (movie: Movie) => void;
}

export default function MovieGrid({ items, onMovieClick }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {items.map((item) => 
            <li key={item.id} onClick={() => onMovieClick(item)}>
                <div className={css.card}>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}                      
                        loading="lazy"
                    />
                    <h2 className={css.title}>{item.title}</h2>
                </div>
            </li>
            )}
        </ul>
    );
}