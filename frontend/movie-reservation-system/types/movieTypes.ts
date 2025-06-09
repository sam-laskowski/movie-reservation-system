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
  genre: Genre;
  duration: number;
  ageRating: AgeRating;
}

export type MovieList = Movie[];

export enum Genre {
  Comedy = "comedy",
  Horror = "horror",
  Drama = "drama",
  Thriller = "thriller",
  Action = "action",
  Fantasy = "fantasy",
  Romance = "romance",
  Scifi = "scifi",
  Musical = "musical",
  Adventure = "adventure",
}

export enum AgeRating {
  U = "U",
  PG = "PG",
  R12 = "R12",
  R15 = "R15",
  R18 = "R18",
}
