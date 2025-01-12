import { decrypt } from "@/app/lib/session";
import type { UserBookings } from "@/types/userTypes";
import { cookies } from "next/headers";
import React from "react";

export default async function UserBookings() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log(session);

  const data = await fetch(
    `http://localhost:8080/bookings/get-user-bookings?userId=${session!.userId}`
  );
  const userBookings: UserBookings = await data.json();
  console.log(userBookings);
  return (
    <div>
      {userBookings.map((booking) => {
        return (
          <div
            className="text-white"
            key={booking.bookingId}
          >
            <h1>Booking ID: {booking.bookingId}</h1>
            <h1>Movie Title: {booking.movieTitle}</h1>
            <h1>Show Time: {booking.showTime}</h1>
          </div>
        );
      })}
    </div>
  );
}
