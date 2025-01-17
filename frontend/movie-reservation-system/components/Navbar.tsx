"use client";

import { logout } from "@/actions/actions";
import { auth } from "@/actions/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await auth();
        if (result) {
          console.log("User found");
          setIsAuthenticated(true);
        } else {
          console.log("User not found");
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.error("Error during authentication", e);
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-3">
        <h1 className="text-4xl p-3">Cinema Deluxe</h1>

        <Link href="/movies">Explore Movies</Link>
        {!isAuthenticated && <Link href="/register">Register</Link>}
        {!isAuthenticated && <Link href="/login">Login</Link>}
        {isAuthenticated && <button onClick={logout}>Logout</button>}
      </div>
    </div>
  );
}
