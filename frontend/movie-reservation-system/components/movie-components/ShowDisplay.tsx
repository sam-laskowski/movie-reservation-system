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
      <h1>Upcoming Shows for today</h1>
      {shows
        .filter((show) => show.movieId == movieId)
        .map((show) => {
          return (
            <div
              key={show.id}
              className="bg-black border-2 border-[#767676] rounded-sm p-4 cursor-pointer hover:border-[#fff] transition-colors ease-linear duration-500"
            >
              <p>
                {convertToTime(show.startTime)} -{" "}
                <span className="text-opacity-80 text-[#767676]">
                  {convertToTime(show.endTime)}
                </span>
              </p>
              <p className="text-[#767676]">Screen {show.cinemaRoomId}</p>
              <p>From ${show.minSeatPrice}</p>
            </div>
          );
        })}
    </div>
  );
}

function convertToTime(dateTimeString: string) {
  const date = new Date(dateTimeString);

  // check if date is valid
  if (isNaN(date.getTime())) {
    throw new Error("invalid date time string");
  }
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12; // convert to 12-hour format
  hours = hours ? hours : 12;

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hours}:${minutesStr}${ampm}`;
}
