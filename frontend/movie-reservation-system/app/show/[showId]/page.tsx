import { Seats } from "@/types/showTypes";
import React from "react";
import SheetDemoWrapper from "./SheetDemoWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ showId: string }>;
}) {
  const { showId } = await params;
  const data = await fetch(
    `http://backend:8080/bookings/find-seats?showId=${showId}`
  );
  const seats: Seats = await data.json();
  //console.log(seats);
  return (
    <div>
      <div className="flex justify-center">
        <div className="grid grid-flow-col-dense grid-rows-5 w-[600px] gap-1">
          {seats.map((seat) => {
            return (
              <div
                key={seat.id}
                className="w-[50px] h-[36px]"
              >
                <SheetDemoWrapper
                  seatId={seat.id}
                  showId={showId}
                  isBooked={seat.status == "booked"}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
