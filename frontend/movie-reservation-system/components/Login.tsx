"use client";
import { login } from "@/actions/actions";
import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function Login() {
  const [state, loginAction, pending] = useActionState(login, undefined);

  return (
    <div className="p-10 pt-40 text-white flex justify-center items-center">
      <form
        action={loginAction}
        className="w-full max-w-md"
      >
        <div className="space-y-6">
          <FormField
            id="username"
            label="Username"
            type="text"
            error={undefined}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            error={undefined}
          />
        </div>
        <div className="mt-6">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  error?: string[];
}

function FormField({ id, label, type, error }: FormFieldProps) {
  return (
    <div className="relative lg:h-[95px] md:h-[95px] sm:h-[95px] h-[115px]">
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        className="w-full text-black p-2 ring-2 ring-orange-400"
      />
      {error && (
        <p className="absolute bottom-0 left-0 text-red-500 text-s mt-1">
          {error}
        </p>
      )}
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
