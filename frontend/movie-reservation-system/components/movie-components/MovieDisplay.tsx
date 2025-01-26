import { Movie } from "@/types/movieTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function MovieDisplay({ movieId }: { movieId: number }) {
  const data = await fetch(
    `http://localhost:8080/movies/get-movie/${movieId}`
    //http://localhost:8080/movies/get-movie/2
  );
  const movie: Movie = await data.json();
  const {
    id,
    posterImage,
    backdropImage,
    title,
    description,
    genre,
    duration,
    ageRating,
  } = movie;
  return (
    <>
      <div className="absolute overflow-hidden -z-10">
        <Image
          src={backdropImage}
          alt="Backdrop poster"
          width={3840}
          height={2160}
          className="opacity-15 object-cover min-h-96 -z-10"
        />
        <div className="absolute top-0 left-0 right-0 h-10 sm:h-20 bg-gradient-to-b from-background to-transparent z-0"></div>
        <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-44 bg-gradient-to-t from-background to-transparent z-0"></div>
      </div>
      <div className="max-w-screen-lg pt-14">
        <div className="flex flex-row w-full">
          <Image
            src={posterImage}
            alt="MOVIE POSTER"
            width={150}
            height={225}
            className="object-contain movie-poster-image mr-10"
          />
          <div className="flex flex-col ml-2">
            <Link
              href={`/movies/${id}`}
              className="text-2xl uppercase font-bold"
            >
              {title}
            </Link>
            <dt>{ageRating}</dt>
            <dl className="line-clamp-3 text-gray-400">{description}</dl>
            <dt className="font-bold">Genre</dt>
            <dt className="text-gray-400 capitalize">{genre}</dt>
            <dt className="font-bold">Run Time</dt>
            <dt className="text-gray-400">{duration}</dt>
          </div>
        </div>
      </div>
    </>
  );
}
