import { useState } from "react";
import { movies, genres } from "../lib/mockData";
import { MovieCard } from "./MovieCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AllMoviesPageProps {
  onMovieClick: (movieId: number) => void;
}

export function AllMoviesPage({ onMovieClick }: AllMoviesPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const years = ["2024", "2025"];

  let filteredMovies = [...movies];

  if (selectedGenre !== "all") {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genres.includes(selectedGenre)
    );
  }

  if (selectedYear !== "all") {
    filteredMovies = filteredMovies.filter(movie => 
      movie.year.toString() === selectedYear
    );
  }

  if (sortBy === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "year") {
    filteredMovies.sort((a, b) => b.year - a.year);
  } else if (sortBy === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl text-white mb-8">All Movies</h1>
        
        <div className="flex flex-wrap gap-4 mb-8 bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-white/70 mb-2 block">Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-white/10">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-white/70 mb-2 block">Year</label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year} className="text-white hover:bg-white/10">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-sm text-white/70 mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                <SelectItem value="rating" className="text-white hover:bg-white/10">Rating</SelectItem>
                <SelectItem value="year" className="text-white hover:bg-white/10">Year</SelectItem>
                <SelectItem value="title" className="text-white hover:bg-white/10">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              onClick={() => onMovieClick(movie.id)}
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No movies found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
