import { ShowList } from "@/types/showTypes";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default async function ShowDisplay({
  cinemaId,
  movieId,
}: {
  cinemaId: number;
  movieId: number;
}) {
  const data = await fetch(`http://backend:8080/shows/${cinemaId}/shows`);
  const shows: ShowList = await data.json();

  // Group shows by date
  const showsByDate = shows
    .filter((show) => show.movieId == movieId)
    .reduce((acc, show) => {
      const date = new Date(show.startTime).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(show);
      return acc;
    }, {} as Record<string, typeof shows>);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white uppercase">Select a Showtime</h1>
      <div className="space-y-8">
        {Object.entries(showsByDate).map(([date, dateShows]) => (
          <div key={date} className="space-y-4">
            <h2 className="text-xl font-semibold text-white uppercase">
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dateShows.map((show) => (
                <Link
                  key={show.id}
                  href={`/show/${show.id}`}
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full h-full min-h-[100px] flex flex-col items-center justify-center gap-2 bg-black border-2 border-[#767676] hover:border-orange-500 hover:text-orange-500 transition-colors duration-300"
                  >
                    <div className="text-lg font-semibold">
                      {convertToTime(show.startTime)}
                    </div>
                    <div className="text-sm text-[#767676] uppercase">
                      Screen {show.cinemaRoomId}
                    </div>
                    <div className="text-sm font-medium uppercase">
                      From ${show.minSeatPrice}
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
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
