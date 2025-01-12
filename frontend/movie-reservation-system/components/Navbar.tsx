import Link from "next/link";
import React from "react";
import SignupForm from "./SignupForm";

export default function Navbar() {
  return (
    <div>
      <h1>Cinema Deluxe</h1>

      <Link href="/movies">Explore Movies</Link>
    </div>
  );
}
