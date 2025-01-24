import MovieCard from "@/components/movie-components/MovieCard";
import { convertToHoursAndMinutes } from "@/lib/utils";
import { Movie, MovieList } from "@/types/movieTypes";
import React from "react";

export default async function MoviesPage() {
  const data = await fetch("http://localhost:8080/movies/all-movies");
  const movies: MovieList = await data.json();
  //console.log(movies);
  return (
    <>
      <div className="flex justify-center mt-28">
        <div className="max-w-screen-lg mx-12">
          {movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterURL={movie.posterImage} // https://theposterdb.com/api/assets/188500/view
              title={movie.title}
              description={movie.description}
              genre={movie.genre}
              duration={convertToHoursAndMinutes(movie.duration)}
              ageRating={movie.ageRating}
            />
          ))}
        </div>
      </div>
    </>
  );
}
