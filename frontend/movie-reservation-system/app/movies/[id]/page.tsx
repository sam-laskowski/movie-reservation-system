import CinemaFetch from "@/components/movie-components/CinemaFetch";
import MovieDisplay from "@/components/movie-components/MovieDisplay";
import React from "react";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = React.use(params);
  //get movie info
  return (
    <div className="flex items-center flex-col">
      <MovieDisplay movieId={id} />
      <CinemaFetch />
    </div>
  );
}
