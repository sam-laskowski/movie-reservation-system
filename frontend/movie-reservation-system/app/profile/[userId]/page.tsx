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
      <div>profile page of user {userId}</div>
      <Bookings userId={userId} />
    </>
  );
}
