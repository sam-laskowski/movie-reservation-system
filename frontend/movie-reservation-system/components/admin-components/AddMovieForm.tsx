"use client";
import { addMovie } from "@/actions/actions";
import React, { useActionState, useState } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  error?: string[];
  isEnum?: boolean;
}

export default function AddMovieForm() {
  const [state, addMovieAction, pending] = useActionState(addMovie, undefined);

  return (
    <div>
      <div className="p-10 pt-40 text-white flex justify-center items-center">
        <form action={addMovieAction}>
          <FormField
            id="title"
            label="Title"
            type="string"
          />
          <FormField
            id="description"
            label="Description"
            type="string"
          />
          <FormField
            id="posterImage"
            label="Poster Image URL"
            type="string"
          />
          <FormField
            id="backdropImage"
            label="Backdrop Image URL"
            type="string"
          />
          <FormField
            id="genre"
            label="Genre"
            type="string"
          />
          <FormField
            id="duration"
            label="Duration"
            type="number"
          />
          <FormField
            id="ageRating"
            label="Age Rating"
            type="string"
          />

          <button type="submit">Add Movie</button>
        </form>
      </div>
    </div>
  );
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
