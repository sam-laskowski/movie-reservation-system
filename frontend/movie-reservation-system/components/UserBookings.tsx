import { decrypt, verifySession } from "@/lib/session";
import type { UserBookings } from "@/types/userTypes";
import React from "react";

export default async function UserBookings() {
  const session = await verifySession();

  if (!session || !session.userId) {
    console.log("user booking session null");
    return <div>Login to view your bookings</div>;
  }

  try {
    const data = await fetch(
      `http://backend:8080/bookings/get-user-bookings?userId=${session!.userId}`
    );

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const userBookings: UserBookings = await data.json();
    console.log(userBookings);

    if (!userBookings.length) {
      return <div>No bookings found</div>;
    }

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
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return <div>Error loading bookings</div>;
  }
}
