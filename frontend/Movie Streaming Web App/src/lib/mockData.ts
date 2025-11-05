export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  description: string;
  poster: string;
  backdrop: string;
  director: string;
  cast: string[];
  duration: number;
  price: number;
  featured?: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Shadows of Tomorrow",
    year: 2024,
    rating: 8.7,
    genres: ["Action", "Sci-Fi", "Thriller"],
    description: "In a dystopian future where memories can be stolen, a rogue agent must race against time to recover the last fragments of humanity's history before they're erased forever.",
    poster: "https://images.unsplash.com/photo-1761948245185-fc300ad20316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIyNzc3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Christopher Nolan",
    cast: ["Ryan Gosling", "Scarlett Johansson", "Idris Elba"],
    duration: 142,
    price: 4.99,
    featured: true
  },
  {
    id: 2,
    title: "Quantum Paradox",
    year: 2024,
    rating: 9.1,
    genres: ["Sci-Fi", "Mystery"],
    description: "A brilliant physicist discovers a way to travel between parallel universes, but each jump creates catastrophic ripples across reality itself.",
    poster: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIzMzYxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Florence Pugh", "Oscar Isaac"],
    duration: 158,
    price: 5.99,
    featured: true
  },
  {
    id: 3,
    title: "The Last Symphony",
    year: 2024,
    rating: 8.3,
    genres: ["Drama", "Romance"],
    description: "A celebrated composer loses her hearing and must find a new way to connect with music and the world around her through the help of an unlikely friend.",
    poster: "https://images.unsplash.com/photo-1761993419168-6c2efb805165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYSUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc2MjMzNjEyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Greta Gerwig",
    cast: ["Saoirse Ronan", "Adam Driver", "Laura Dern"],
    duration: 127,
    price: 3.99,
    featured: true
  },
  {
    id: 4,
    title: "Midnight Laughs",
    year: 2025,
    rating: 7.8,
    genres: ["Comedy"],
    description: "A struggling comedian accidentally becomes an internet sensation after a disastrous performance goes viral, changing their life overnight.",
    poster: "https://images.unsplash.com/photo-1587042285747-583b4d4d73b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIyOTA1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Judd Apatow",
    cast: ["Awkwafina", "Bill Hader", "Kate McKinnon"],
    duration: 105,
    price: 3.99,
    featured: true
  },
  {
    id: 5,
    title: "Realm of Legends",
    year: 2024,
    rating: 8.9,
    genres: ["Fantasy", "Adventure", "Action"],
    description: "A young warrior must unite the seven kingdoms to prevent an ancient evil from awakening and plunging the world into eternal darkness.",
    poster: "https://images.unsplash.com/photo-1759267960211-5f445be05c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYWR2ZW50dXJlJTIwbW92aWV8ZW58MXx8fHwxNzYyMjU5MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Peter Jackson",
    cast: ["Tom Holland", "Zendaya", "Cate Blanchett"],
    duration: 165,
    price: 5.99,
    featured: true
  },
  {
    id: 6,
    title: "Echoes in the Dark",
    year: 2025,
    rating: 7.5,
    genres: ["Horror", "Thriller"],
    description: "A family moves into a historic mansion, only to discover that the walls hold terrifying secrets and echoes of the past that won't stay buried.",
    poster: "https://images.unsplash.com/photo-1712456298333-5747a9506a5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIyOTA1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "James Wan",
    cast: ["Vera Farmiga", "Patrick Wilson", "Madison Wolfe"],
    duration: 112,
    price: 4.99,
    featured: true
  },
  {
    id: 7,
    title: "Hearts Aligned",
    year: 2025,
    rating: 8.1,
    genres: ["Romance", "Drama"],
    description: "Two strangers from different worlds find themselves drawn together by fate, but their love faces impossible odds in a society determined to keep them apart.",
    poster: "https://images.unsplash.com/photo-1660997075925-ebb3cbc94540?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbW92aWUlMjBwb3N0ZXJ8ZW58MXx8fHwxNzYyMzU3NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Luca Guadagnino",
    cast: ["Margot Robbie", "Austin Butler", "Emma Stone"],
    duration: 118,
    price: 3.99
  },
  {
    id: 8,
    title: "The Silent Chase",
    year: 2024,
    rating: 8.6,
    genres: ["Thriller", "Crime", "Drama"],
    description: "A detective with a photographic memory hunts a serial killer who leaves no trace, in a psychological game of cat and mouse.",
    poster: "https://images.unsplash.com/photo-1710988486821-9af47f60d62b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc2MjI2NzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "David Fincher",
    cast: ["Jake Gyllenhaal", "Rosamund Pike", "Mark Ruffalo"],
    duration: 135,
    price: 4.99
  },
  {
    id: 9,
    title: "Velocity",
    year: 2025,
    rating: 7.9,
    genres: ["Action", "Adventure"],
    description: "An ex-racer is forced back into the underground racing scene when his brother's life is threatened by a dangerous crime syndicate.",
    poster: "https://images.unsplash.com/photo-1761948245185-fc300ad20316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIyNzc3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Justin Lin",
    cast: ["John Boyega", "Ana de Armas", "Michael B. Jordan"],
    duration: 122,
    price: 4.99
  },
  {
    id: 10,
    title: "Code Blue",
    year: 2024,
    rating: 8.4,
    genres: ["Sci-Fi", "Action", "Thriller"],
    description: "A hacker discovers a conspiracy within a tech giant that plans to control the minds of billions through their devices.",
    poster: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIzMzYxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Lana Wachowski",
    cast: ["Elliot Page", "Tessa Thompson", "Dev Patel"],
    duration: 140,
    price: 5.99
  },
  {
    id: 11,
    title: "Summer of '89",
    year: 2025,
    rating: 7.6,
    genres: ["Comedy", "Drama"],
    description: "Four childhood friends reunite after 30 years to relive their epic summer vacation, discovering that some bonds never fade.",
    poster: "https://images.unsplash.com/photo-1587042285747-583b4d4d73b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjIyOTA1MjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1688678004647-945d5aaf91c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBzY3JlZW4lMjBtb3ZpZXxlbnwxfHx8fDE3NjIzNTc3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Richard Linklater",
    cast: ["Paul Rudd", "Jason Bateman", "Amy Poehler", "Maya Rudolph"],
    duration: 110,
    price: 3.99
  },
  {
    id: 12,
    title: "The Prophecy",
    year: 2024,
    rating: 8.8,
    genres: ["Fantasy", "Drama"],
    description: "A chosen one must embrace their destiny to save a dying world, but the cost may be greater than they're willing to pay.",
    poster: "https://images.unsplash.com/photo-1759267960211-5f445be05c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYWR2ZW50dXJlJTIwbW92aWV8ZW58MXx8fHwxNzYyMjU5MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    backdrop: "https://images.unsplash.com/photo-1621276336795-925346853745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBkYXJrfGVufDF8fHx8MTc2MjM1NzcwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    director: "Guillermo del Toro",
    cast: ["Anya Taylor-Joy", "Benedict Cumberbatch", "Lupita Nyong'o"],
    duration: 152,
    price: 5.99
  }
];

export const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller"];

export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => movie.genres.includes(genre));
};

export const getFeaturedMovies = (): Movie[] => {
  return movies.filter(movie => movie.featured);
};
