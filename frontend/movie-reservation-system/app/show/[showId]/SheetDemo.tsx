"use client";
import { bookSeat } from "@/actions/actions";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Armchair } from "lucide-react";

export default function SheetDemo({
  seatId,
  showId,
  userId,
  isBooked,
}: {
  seatId: number;
  showId: string;
  userId?: any;
  isBooked: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          disabled={isBooked}
        >
          <Armchair />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Book Seat</SheetTitle>
          <SheetDescription>For selected seat</SheetDescription>
        </SheetHeader>
        <div>{userId ? <div>Logged in</div> : <Login />}</div>
        <SheetFooter>
          <Button
            onClick={() => bookSeat(userId, showId, seatId)}
            disabled={!userId}
          >
            Book
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
