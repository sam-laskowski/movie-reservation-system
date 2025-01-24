export interface MovieCardProps {
  id: number;
  posterURL: string;
  title: string;
  description: string;
  genre: string;
  duration: string;
  ageRating: string;
}

export interface Movie {
  id: number;
  posterImage: string;
  backdropImage: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  ageRating: string;
}

export type MovieList = Movie[];
