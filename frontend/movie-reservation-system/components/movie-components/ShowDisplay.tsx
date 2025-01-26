import { ShowList } from "@/types/showTypes";
import React from "react";

export default async function ShowDisplay({
  cinemaId,
  movieId,
}: {
  cinemaId: number;
  movieId: number;
}) {
  const data = await fetch(`http://localhost:8080/shows/${cinemaId}/shows`);
  const shows: ShowList = await data.json();
  console.log(shows);
  // convert show times from string into time
  return (
    <div>
      {shows
        .filter((show) => show.movieId == movieId)
        .map((show) => {
          return (
            <div key={show.id}>
              <p>
                {show.startTime} - {show.endTime}
              </p>
              <p>Screen {show.cinemaRoomId}</p>
              <p>From ${show.minSeatPrice}</p>
            </div>
          );
        })}
    </div>
  );
}
