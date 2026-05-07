"use client";
import { Seat } from "@/types/showTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { confirmPayment } from "@/actions/actions";
import { useState, useEffect } from "react";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: Seat[];
  userId: string;
  reservationId: number;
  onPaymentComplete: () => void;
  showId: string;
}

export default function PaymentDialog({
  isOpen,
  onClose,
  selectedSeats,
  userId,
  reservationId,
  onPaymentComplete,
  showId,
}: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isOpen, timeRemaining]);

  // Reset timer when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeRemaining(300);
    }
  }, [isOpen]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Calculate pricing
  const ticketCount = selectedSeats.length;
  const seatPrices = selectedSeats.map((seat) => seat.price);
  const subtotal = seatPrices.reduce((sum, price) => sum + price, 0);
  const bookingFee = ticketCount * 1.5; // $1.50 per ticket
  const total = subtotal + bookingFee;

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    try {
      const seatIds = selectedSeats.map((seat) => seat.id);
      await confirmPayment(seatIds, userId, reservationId, showId);
      onPaymentComplete();
      onClose();
      window.location.href = "/purchase-complete";
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
          <DialogDescription>
            Review your ticket details and confirm payment to complete your
            reservation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Information */}
          <div>
            <h3 className="font-semibold mb-3">Ticket Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Number of Tickets
                </span>
                <Badge variant="secondary">{ticketCount}</Badge>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Selected Seats:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <Badge
                      key={seat.id}
                      variant="outline"
                    >
                      Seat {seat.id}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Seat Types:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <Badge
                      key={seat.id}
                      variant="outline"
                      className="capitalize"
                    >
                      {seat.type.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing Breakdown */}
          <div>
            <h3 className="font-semibold mb-3">Pricing Details</h3>
            <div className="space-y-2">
              {selectedSeats.map((seat, index) => (
                <div
                  key={seat.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    Seat {seat.id} ({seat.type})
                  </span>
                  <span>${seat.price.toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Booking Fee ({ticketCount} × $1.50)</span>
                <span>${bookingFee.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Reservation Info */}
          <div className="text-sm text-muted-foreground">
            <p>Reservation ID: {reservationId}</p>
            <div className="flex items-center gap-2">
              <span>Tickets held for 5 minutes:</span>
              <span
                className={`font-mono font-semibold ${timeRemaining <= 60 ? "text-red-500" : "text-green-600"}`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            {timeRemaining === 0 && (
              <p className="text-red-500 font-medium">
                Reservation time has expired!
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Processing..."
              : `Confirm Payment $${total.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
