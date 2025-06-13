import { verifySession } from "@/lib/session";
import SheetDemo from "./SheetDemo";

export default async function SheetDemoWrapper({
  seatId,
  showId,
  isBooked,
}: {
  seatId: number;
  showId: string;
  isBooked: boolean;
}) {
  const session = await verifySession();
  return (
    <SheetDemo
      seatId={seatId}
      showId={showId}
      userId={session?.userId}
      isBooked={isBooked}
    />
  );
}
