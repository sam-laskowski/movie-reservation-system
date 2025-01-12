import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";
import React from "react";

export default async function UserBookings() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  console.log(session);

  const data = await fetch(
    `http://localhost:8080/bookings/get-user-bookings?userId=${session!.userId}`
  );
  const userBookings = await data.json();
  console.log(userBookings);
  return (
    <div>
      <div>{}</div>
    </div>
  );
}
