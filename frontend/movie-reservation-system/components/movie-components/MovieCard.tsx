import { Movie, MovieCardProps } from "@/types/movieTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MovieCard({
  id,
  posterURL,
  title,
  description,
  genre,
  duration,
  ageRating, // put age rating as logo image
}: MovieCardProps) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row items-start w-full">
          <Image
            src={posterURL}
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
        <hr className="block h-1 my-4 p-0 w-full opacity-50" />
      </div>
    </>
  );
}
