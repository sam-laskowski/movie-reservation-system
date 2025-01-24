import React from "react";
import CinemaSelect from "./CinemaSelect";
import { CinemaList } from "@/types/cinemaTypes";

export default async function CinemaFetch() {
  const data = await fetch(`http://localhost:8080/cinemas/all-cinemas`);
  const allCinemas: CinemaList = await data.json();
  return (
    <div>
      <CinemaSelect allCinemas={allCinemas} />
    </div>
  );
}
