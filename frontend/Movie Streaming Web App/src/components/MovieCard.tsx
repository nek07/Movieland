import { Star, Heart } from "lucide-react";
import { Movie } from "../lib/mockData";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={onClick}
      className="group relative cursor-pointer rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <ImageWithFallback 
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? "fill-orange-500 text-orange-500" : "text-white"}`} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-white line-clamp-1 mb-2">{movie.title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span className="text-sm text-white/90">{movie.rating}</span>
          </div>
          <span className="text-xs text-white/60">{movie.year}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-2">
          {movie.genres.slice(0, 2).map((genre) => (
            <span 
              key={genre}
              className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
