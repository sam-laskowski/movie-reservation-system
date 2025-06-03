import React from "react";
import CinemaSelect from "./CinemaSelect";
import { CinemaList } from "@/types/cinemaTypes";

export default async function CinemaFetch({
  movieId,
  cinemaId,
}: {
  movieId: number;
  cinemaId: number;
}) {
  const data = await fetch(`http://backend:8080/cinemas/all-cinemas`);
  const allCinemas: CinemaList = await data.json();
  return (
    <div>
      <CinemaSelect
        allCinemas={allCinemas}
        movieId={movieId}
        cinemaId={cinemaId}
      />
    </div>
  );
}
