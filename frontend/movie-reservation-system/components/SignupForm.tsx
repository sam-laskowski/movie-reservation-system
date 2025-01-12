"use client";

import { register } from "@/app/actions/actions";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
            value={formData.username}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
