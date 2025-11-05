import { useState } from "react";
import { movies } from "../lib/mockData";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User, Edit2, Save } from "lucide-react";

interface ProfilePageProps {
  onMovieClick: (movieId: number) => void;
  onLogout: () => void;
}

export function ProfilePage({ onMovieClick, onLogout }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");

  const watchedMovies = movies.slice(0, 6);
  const favoriteMovies = movies.slice(2, 8);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-lg border border-white/20 p-8 mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center shadow-lg shadow-orange-500/50">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="flex-1 space-y-6 w-full">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl text-white">My Profile</h1>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/70">Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white text-lg">{name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white text-lg">{email}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white/70">New Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Leave blank to keep current password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Button
                    onClick={onLogout}
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl text-white mb-6">Watched Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {watchedMovies.map((movie) => (
                  <MovieCard 
                    key={movie.id}
                    movie={movie}
                    onClick={() => onMovieClick(movie.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-white mb-6">My Favorites</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {favoriteMovies.map((movie) => (
                  <MovieCard 
                    key={movie.id}
                    movie={movie}
                    onClick={() => onMovieClick(movie.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-white mb-6">Recommended for You</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {movies.slice(6, 12).map((movie) => (
                  <MovieCard 
                    key={movie.id}
                    movie={movie}
                    onClick={() => onMovieClick(movie.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
