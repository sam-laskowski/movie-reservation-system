"use client";
import { Seats, Seat } from "@/types/showTypes";
import React, { useState, useEffect } from "react";
import SeatSelectable from "./SeatSelectable";
import PaymentDialog from "./PaymentDialog";
import { Button } from "@/components/ui/button";
import { reserveSeats } from "@/actions/actions";
import { verifySession } from "@/lib/session";

export default function Page({
  params,
}: {
  params: Promise<{ showId: string }>;
}) {
  const [showId, setShowId] = useState<string>("");
  const [seats, setSeats] = useState<Seats>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [reservationId, setReservationId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const { showId: id } = await params;
      setShowId(id);

      // Load seats
      const data = await fetch(`/api/bookings/find-seats?showId=${id}`);
      const seatsData: Seats = await data.json();
      const sortedSeats = [...seatsData].sort((a, b) =>
        a.id.toString().localeCompare(b.id.toString()),
      );
      setSeats(sortedSeats);

      // Load user session
      const session = await verifySession();
      setUserId((session?.userId as string) || null);

      setIsLoading(false);
    };

    loadData();
  }, [params]);

  const handleSeatSelect = (seatId: number, isSelected: boolean) => {
    setSelectedSeats((prev) => {
      if (isSelected) {
        return [...prev, seatId];
      } else {
        return prev.filter((id) => id !== seatId);
      }
    });
  };

  const handleReserveSeats = async () => {
    if (selectedSeats.length === 0 || !userId) return;

    try {
      const response = await reserveSeats(selectedSeats, userId);
      setReservationId(response.reservationId);
      setShowPaymentDialog(true);
    } catch (error) {
      console.error("Failed to reserve seats:", error);
    }
  };

  const handlePaymentComplete = () => {
    // Clear selected seats and reservation state
    setSelectedSeats([]);
    setReservationId(null);
    // Optionally refresh seats or show success message
    // You could add a toast notification here
  };

  const getSelectedSeatObjects = (): Seat[] => {
    return seats.filter((seat) => selectedSeats.includes(seat.id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-center mb-8">
        <div className="grid grid-flow-col-dense grid-rows-5 w-[600px] gap-1">
          {seats.map((seat) => {
            return (
              <div
                key={seat.id}
                className="w-[50px] h-[36px]"
              >
                <SeatSelectable
                  seat={seat}
                  showId={showId}
                  userId={userId}
                  isSelected={selectedSeats.includes(seat.id)}
                  onSeatSelect={handleSeatSelect}
                />
              </div>
            );
          })}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="text-center">
            <p className="mb-4">Selected Seats: {selectedSeats.length}</p>
            <Button
              onClick={handleReserveSeats}
              disabled={!userId}
            >
              Reserve {selectedSeats.length} Seat
              {selectedSeats.length > 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      )}

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        selectedSeats={getSelectedSeatObjects()}
        userId={userId!}
        reservationId={reservationId!}
        onPaymentComplete={handlePaymentComplete}
        showId={showId}
      />
    </div>
  );
}
