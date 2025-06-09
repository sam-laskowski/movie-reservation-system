import { z } from "zod";

export const GenreEnum = z.enum([
  "comedy",
  "horror",
  "drama",
  "thriller",
  "action",
  "fantasy",
  "romance",
  "scifi",
  "musical",
  "adventure",
]);

export const AgeRatingEnum = z.enum(["U", "PG", "R12", "R15", "R18"]);

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  posterImage: z.string().url("Must be a valid URL"),
  backdropImage: z.string().url("Must be a valid URL"),
  genre: GenreEnum,
  duration: z.coerce.number().positive("Duration must be positive"),
  ageRating: AgeRatingEnum,
});
