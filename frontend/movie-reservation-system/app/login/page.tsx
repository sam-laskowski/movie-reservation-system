import Login from "@/components/Login";
import { verifySession } from "@/lib/session";
import React from "react";
import { redirect } from 'next/navigation'


export default async function LoginPage() {
  const session = await verifySession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <Login />
    </div>
  );
}
