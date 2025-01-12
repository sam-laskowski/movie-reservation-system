"use client";

import { register } from "@/app/actions/actions";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function SignupForm() {
  const [state, registerAction] = useActionState(register, undefined);

  return (
    <div className="p-10 text-black">
      <form action={registerAction}>
        <div>
          <label
            htmlFor="username"
            className="text-white"
          >
            Name
          </label>
          <input
            id="username"
            name="username"
            placeholder="username"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-white"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="text-white"
    >
      Register
    </button>
  );
}
