import { verifySession } from "@/lib/session";
import SheetDemo from "./SeatSelectable";
import { Seat } from "@/types/showTypes";

export default async function SeatSelectableWrapper({
  seat,
  showId,
  isSelected,
  onSeatSelect,
}: {
  seat: Seat;
  showId: string;
  isSelected: boolean;
  onSeatSelect: (seatId: number, isSelected: boolean) => void;
}) {
  const session = await verifySession();
  return (
    <SheetDemo
      seat={seat}
      showId={showId}
      userId={(session?.userId as string) || null}
      isSelected={isSelected}
      onSeatSelect={onSeatSelect}
    />
  );
}
