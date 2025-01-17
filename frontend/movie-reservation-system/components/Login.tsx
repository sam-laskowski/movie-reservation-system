"use client";
import { login } from "@/actions/actions";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function Login() {
  const [state, registerAction] = useActionState(login, undefined);

  return (
    <div>
      <div className="p-10 pt-40 text-white flex justify-center items-center">
        <form action={registerAction}>
          <div className="mt-4">
            <label htmlFor="username"></label>
            <input
              id="username"
              name="username"
              placeholder="Username"
              className="text-black p-2 ring-2 ring-orange-400"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password"></label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="text-black p-2 ring-2 ring-orange-400"
            />
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="text-white w-full mt-4 border border-orange-500 py-2 rounded-sm text-center"
    >
      Login
    </button>
  );
}
