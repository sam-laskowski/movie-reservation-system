import Bookings from "@/components/user-components/Bookings";
import React from "react";

export default function page({
  params,
}: {
  params: Promise<{ userId: number }>;
}) {
  const { userId } = React.use(params);
  return (
    <>
      <Bookings userId={userId} />
    </>
  );
}
