"use client";
import { Seat } from "@/types/showTypes";
import { Button } from "@/components/ui/button";
import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SeatSelectable({
  seat,
  showId,
  userId,
  isSelected,
  onSeatSelect,
}: {
  seat: Seat;
  showId: string;
  userId: string | null;
  isSelected: boolean;
  onSeatSelect: (seatId: number, isSelected: boolean) => void;
}) {
  const isBooked = seat.status === "booked";
  const isReserved = seat.status === "held";

  const handleClick = () => {
    if (!userId || isBooked || isReserved) return;
    onSeatSelect(seat.id, !isSelected);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!userId || isBooked || isReserved}
      variant="outline"
      className={cn("w-full h-full p-2", {
        "bg-green-500 hover:bg-green-600 ":
          isSelected && !isBooked && !isReserved,
        "bg-red-500 hover:bg-red-600 cursor-not-allowed": isBooked,
        "bg-yellow-500 hover:bg-yellow-600 cursor-not-allowed": isReserved,
        "bg-gray-700 hover:bg-gray-600":
          !isSelected && !isBooked && !isReserved && userId,
        "bg-gray-800 cursor-not-allowed opacity-50":
          !userId && !isBooked && !isReserved,
      })}
    >
      <Armchair className="w-4 h-4" />
    </Button>
  );
}
