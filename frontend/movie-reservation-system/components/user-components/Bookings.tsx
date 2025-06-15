import { verifySession } from "@/lib/session";
import { UserBookingList, UserBooking } from "@/types/bookingTypes";
import React from "react";

export default async function Bookings({ userId }: { userId: number }) {
  const userBookingsData = await fetch(
    `http://backend:8080/bookings/get-user-bookings?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const userBookings: UserBookingList = await userBookingsData.json();

  return (
    <div>
      {userBookings.map((booking: UserBooking) => (
        <>
          <div>{booking.bookingId}</div>
          <div>{booking.movieTitle}</div>
        </>
      ))}
    </div>
  );
}
