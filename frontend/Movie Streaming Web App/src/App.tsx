import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AllMoviesPage } from "./components/AllMoviesPage";
import { MovieDetailsPage } from "./components/MovieDetailsPage";
import { LoginPage } from "./components/LoginPage";
import { ProfilePage } from "./components/ProfilePage";

type Page = "home" | "movies" | "details" | "login" | "profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
    setCurrentPage("details");
  };

  const handleNavigate = (page: string) => {
    if (page === "profile" && !isLoggedIn) {
      setCurrentPage("login");
    } else {
      setCurrentPage(page as Page);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleBack = () => {
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen bg-black">
      {currentPage !== "login" && (
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
        />
      )}

      {currentPage === "home" && (
        <HomePage onMovieClick={handleMovieClick} />
      )}

      {currentPage === "movies" && (
        <AllMoviesPage onMovieClick={handleMovieClick} />
      )}

      {currentPage === "details" && selectedMovieId && (
        <MovieDetailsPage 
          movieId={selectedMovieId}
          onBack={handleBack}
          onMovieClick={handleMovieClick}
        />
      )}

      {currentPage === "login" && (
        <LoginPage onLogin={handleLogin} onBack={handleBack} />
      )}

      {currentPage === "profile" && (
        <ProfilePage 
          onMovieClick={handleMovieClick}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
