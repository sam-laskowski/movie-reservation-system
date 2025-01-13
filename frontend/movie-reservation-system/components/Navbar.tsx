import Link from "next/link";
import React from "react";
import SignupForm from "./SignupForm";

export default function Navbar() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-3">
        <h1 className="text-4xl p-3">Cinema Deluxe</h1>

        <Link href="/movies">Explore Movies</Link>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
