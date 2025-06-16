"use client";
import { BookingCardParams } from "@/types/bookingTypes";
import Image from "next/image";
import React from "react";

export default function BookingCard(params: BookingCardParams) {
  const {
    userId,
    bookingId,
    seatType,
    seatPrice,
    showTime,
    movieTitle,
    moviePoster,
  } = params;

  const seatTypeColorClass =
    seatType.toLowerCase() === "premium"
      ? "bg-amber-500 text-black"
      : seatType.toLowerCase() === "standard"
      ? "bg-amber-700 text-white"
      : "bg-gray-500";

  return (
    <div className="max-w-[225px] w-full bg-black movie-poster-image overflow-hidden border border-gray-800">
      <div className="relative">
        <Image
          src={moviePoster}
          alt={`${movieTitle} poster`}
          className="w-full h-64 object-contain"
          width={150}
          height={225}
          onError={(e) => {
            e.currentTarget.src = "/placeholder-poster.jpg"; // Fallback image
          }}
        />
      </div>
      <div className="p-3 space-y-1">
        <h2 className="text-lg font-bold text-white truncate flex items-center gap-1">
          {movieTitle}
          <span
            className={`text-white text-xs font-semibold px-1.5 py-0.5 rounded-full ${seatTypeColorClass}`}
          >
            {seatType}
          </span>
        </h2>
        <div className="mt-1 text-xs text-gray-300 space-y-0.5">
          <p>
            <span className="font-semibold">Show Time:</span>{" "}
            {showTime.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold">Booking ID:</span> {bookingId}
          </p>
          <p>
            <span className="font-semibold">User ID:</span> {userId}
          </p>
          <p>
            <span className="font-semibold">Price:</span> $
            {seatPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
