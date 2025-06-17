"use client";

import React, { useState } from "react";
import Link from "next/link";
import { logout } from "@/actions/actions";

interface MobileNavLinksProps {
  user: string | undefined;
  sessionRole: string | undefined;
}

export function MobileNavLinks({ user, sessionRole }: MobileNavLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2 transition-transform transform active:scale-95"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            )}
          </svg>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {sessionRole === "ADMIN" && (
          <Link
            href={"/dashboard"}
            className="uppercase text-white hover:text-orange-500 transition-colors duration-200 font-medium"
          >
            ADMIN Dashboard
          </Link>
        )}
        <Link
          href="/movies"
          className="uppercase text-white hover:text-orange-500 transition-colors duration-200 font-medium"
        >
          Explore Movies
        </Link>
        {user !== "undefined" ? (
          <>
            <Link
              href={`/profile/${user}`}
              className="uppercase text-white hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Profile
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="uppercase bg-orange-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="uppercase text-white hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="uppercase bg-orange-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-800 border-t border-gray-700 shadow-xl py-6 z-10 animate-fade-in-down">
          <div className="flex flex-col items-center gap-5">
            {" "}
            {sessionRole === "ADMIN" && (
              <Link
                href={"/dashboard"}
                className="uppercase text-white hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center text-lg font-medium"
              >
                ADMIN Dashboard
              </Link>
            )}
            <Link
              href="/movies"
              className="uppercase text-white hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center text-lg font-medium"
            >
              Explore Movies
            </Link>
            {user !== "undefined" ? (
              <>
                <Link
                  href={`/profile/${user}`}
                  className="uppercase text-white hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center text-lg font-medium"
                >
                  Profile
                </Link>
                <form
                  action={logout}
                  className="w-full text-center"
                >
                  <button
                    type="submit"
                    className="uppercase bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-lg font-medium"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="uppercase text-white hover:text-orange-500 transition-colors duration-200 py-2 w-full text-center text-lg font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="uppercase bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-lg font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
