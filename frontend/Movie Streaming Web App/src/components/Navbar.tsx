import { Search, Film, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
}

export function Navbar({ currentPage, onNavigate, isLoggedIn }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/95 via-black/90 to-transparent backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 group"
            >
              <Film className="w-8 h-8 text-orange-500" />
              <span className="text-2xl bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
                CineStream
              </span>
            </button>
            
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => onNavigate("home")}
                className={`transition-colors ${
                  currentPage === "home" 
                    ? "text-orange-500" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate("movies")}
                className={`transition-colors ${
                  currentPage === "movies" 
                    ? "text-orange-500" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => onNavigate("home")}
                className="text-white/70 hover:text-white transition-colors"
              >
                Genres
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => onNavigate("profile")}
                  className={`transition-colors ${
                    currentPage === "profile" 
                      ? "text-orange-500" 
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input 
                placeholder="Search movies..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 w-64 focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            
            {isLoggedIn ? (
              <button
                onClick={() => onNavigate("profile")}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            ) : (
              <Button 
                onClick={() => onNavigate("login")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
