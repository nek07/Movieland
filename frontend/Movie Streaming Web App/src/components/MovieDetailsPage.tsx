import { movies, Movie } from "../lib/mockData";
import { Star, Play, Plus, Heart, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { MovieCard } from "./MovieCard";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MovieDetailsPageProps {
  movieId: number;
  onBack: () => void;
  onMovieClick: (movieId: number) => void;
}

export function MovieDetailsPage({ movieId, onBack, onMovieClick }: MovieDetailsPageProps) {
  const movie = movies.find(m => m.id === movieId);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );
  }

  const similarMovies = movies
    .filter(m => 
      m.id !== movie.id && 
      m.genres.some(g => movie.genres.includes(g))
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-black">
      <div 
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <Button
          onClick={onBack}
          variant="outline"
          className="absolute top-6 left-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-6 -mt-64 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-shrink-0">
            <div className="w-80 rounded-lg overflow-hidden shadow-2xl shadow-orange-500/20">
              <ImageWithFallback 
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-5xl text-white mb-2">{movie.title}</h1>
              <div className="flex items-center gap-4 text-white/70">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration} min</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="w-7 h-7 fill-orange-500 text-orange-500" />
                <span className="text-3xl text-white">{movie.rating}</span>
                <span className="text-white/60">/10</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span 
                  key={genre}
                  className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xl text-white">Synopsis</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {movie.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white/60 text-sm mb-2">Director</h4>
                <p className="text-white">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-sm mb-2">Cast</h4>
                <p className="text-white">{movie.cast.join(", ")}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Trailer
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Watchlist
              </Button>
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Heart className="w-5 h-5 mr-2" />
                Favorite
              </Button>
            </div>

            <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-lg p-6 border border-orange-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 mb-1">Available for Rent/Purchase</p>
                  <p className="text-3xl text-white">${movie.price}</p>
                </div>
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3">
                  Buy / Rent
                </Button>
              </div>
            </div>
          </div>
        </div>

        {similarMovies.length > 0 && (
          <div className="mt-20 mb-12">
            <h2 className="text-3xl text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {similarMovies.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  onClick={() => onMovieClick(movie.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
