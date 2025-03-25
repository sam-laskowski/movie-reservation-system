import { Seats } from "@/types/showTypes";
import React from "react";
import { Armchair } from "lucide-react";
import { SheetDemo } from "./testywesty";

export default async function Page({ params }: { params: { showId: string } }) {
  const { showId } = await params;
  const data = await fetch(
    `http://localhost:8080/bookings/find-seats?showId=${showId}`
  );
  const seats: Seats = await data.json();
  //console.log(seats);
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-flow-col-dense grid-rows-5 w-[600px] gap-1">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className="w-[50px] h-[36px]"
            >
              <SheetDemo />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
