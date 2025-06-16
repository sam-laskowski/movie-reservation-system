import { UserBookingList, UserBooking } from "@/types/bookingTypes";
import React from "react";
import BookingCard from "./BookingCard";

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
  console.log(userBookings);
  return (
    <div className="container mx-auto px-2 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center">
        {userBookings.map((booking) => (
          <BookingCard
            key={booking.bookingId}
            {...booking}
          />
        ))}
      </div>
    </div>
  );
}
