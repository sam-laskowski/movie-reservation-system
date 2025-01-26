import CinemaFetch from "@/components/movie-components/CinemaFetch";
import MovieDisplay from "@/components/movie-components/MovieDisplay";
import ShowDisplay from "@/components/movie-components/ShowDisplay";
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: number; cinemaId: number }>;
}) {
  const { id, cinemaId } = React.use(params);
  //get movie info
  return (
    <div className="flex items-center flex-col">
      <MovieDisplay movieId={id} />
      <CinemaFetch
        movieId={id}
        cinemaId={cinemaId}
      />
      <p>cinema {cinemaId}</p>
      {/* components that display show times for the specific movie and cinema beneath */}
      <ShowDisplay cinemaId={cinemaId} />
    </div>
  );
}
