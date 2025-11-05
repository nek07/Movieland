import { getFeaturedMovies, getMoviesByGenre, genres } from "../lib/mockData";
import { HeroCarousel } from "./HeroCarousel";
import { MovieRow } from "./MovieRow";

interface HomePageProps {
  onMovieClick: (movieId: number) => void;
}

export function HomePage({ onMovieClick }: HomePageProps) {
  const featuredMovies = getFeaturedMovies();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <HeroCarousel movies={featuredMovies} onMovieClick={onMovieClick} />
      
      <div className="py-12 space-y-8">
        {genres.map((genre) => {
          const genreMovies = getMoviesByGenre(genre);
          if (genreMovies.length === 0) return null;
          
          return (
            <MovieRow 
              key={genre}
              title={genre}
              movies={genreMovies}
              onMovieClick={onMovieClick}
            />
          );
        })}
      </div>
    </div>
  );
}
