import { useState, useEffect } from "react";
import { Movie } from "../lib/mockData";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface HeroCarouselProps {
  movies: Movie[];
  onMovieClick: (movieId: number) => void;
}

export function HeroCarousel({ movies, onMovieClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentMovie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-6 flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-orange-500/90 rounded text-sm">Featured</span>
            <span className="text-white/80">{currentMovie.year}</span>
          </div>
          
          <h1 className="text-6xl text-white">
            {currentMovie.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Star className="w-6 h-6 fill-orange-500 text-orange-500" />
              <span className="text-xl text-white">{currentMovie.rating}</span>
            </div>
            <div className="flex gap-2">
              {currentMovie.genres.map((genre) => (
                <span 
                  key={genre}
                  className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-lg text-white/80 line-clamp-3">
            {currentMovie.description}
          </p>
          
          <div className="flex gap-4">
            <Button
              onClick={() => onMovieClick(currentMovie.id)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Now
            </Button>
            <Button
              onClick={() => onMovieClick(currentMovie.id)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              More Info
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-orange-500 transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-12 bg-orange-500" 
                : "w-6 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
