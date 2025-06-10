"use client";
import { addMovie } from "@/actions/actions";
import React, { useActionState, useState } from "react";
import EnumSelector from "./EnumSelector";
import { AgeRating, Genre } from "@/types/movieTypes";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  error?: string[];
  defaultValue?: string | number;
}

interface FormFieldEnumProps {
  id: string;
  label: string;
  type: string;
  error?: string[];
  options: string[];
  defaultValue?: string;
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
            error={state?.errors?.title}
            defaultValue={state?.errors?.title ? "" : state?.data?.title || ""}
          />
          <FormField
            id="description"
            label="Description"
            type="string"
            error={state?.errors?.description}
            defaultValue={
              state?.errors?.description ? "" : state?.data?.description || ""
            }
          />
          <FormField
            id="posterImage"
            label="Poster Image URL"
            type="string"
            error={state?.errors?.posterImage}
            defaultValue={
              state?.errors?.posterImage ? "" : state?.data?.posterImage || ""
            }
          />
          <FormField
            id="backdropImage"
            label="Backdrop Image URL"
            type="string"
            error={state?.errors?.backdropImage}
            defaultValue={
              state?.errors?.backdropImage
                ? ""
                : state?.data?.backdropImage || ""
            }
          />
          <FormFieldEnum
            id="genre"
            label="Genre"
            type="string"
            error={state?.errors?.genre}
            options={Object.values(Genre)}
            defaultValue={state?.errors?.genre ? "" : state?.data?.genre || ""}
          />
          <FormField
            id="duration"
            label="Duration"
            type="string"
            error={state?.errors?.duration}
            defaultValue={
              state?.errors?.duration ? "" : state?.data?.duration || ""
            }
          />
          <FormFieldEnum
            id="ageRating"
            label="Age Rating"
            type="string"
            error={state?.errors?.ageRating}
            options={Object.values(AgeRating)}
            defaultValue={
              state?.errors?.ageRating ? "" : state?.data?.ageRating || ""
            }
          />

          <button
            type="submit"
            disabled={pending}
          >
            {pending ? "Adding..." : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  type,
  error,
  defaultValue = "",
}: FormFieldProps) {
  return (
    <>
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
          defaultValue={defaultValue}
          className="w-full text-black p-2 ring-2 ring-orange-400"
        />
        {error && (
          <p className="absolute bottom-0 left-0 text-red-500 text-s mt-1 max-w-full">
            {error}
          </p>
        )}
      </div>
    </>
  );
}

function FormFieldEnum({
  id,
  label,
  type,
  error,
  options,
  defaultValue,
}: FormFieldEnumProps) {
  return (
    <>
      <div className="relative lg:h-[95px] md:h-[95px] sm:h-[95px] h-[115px]">
        <label
          htmlFor={id}
          className="block text-sm font-medium mb-1"
        >
          {label}
        </label>
        <EnumSelector
          name={id}
          options={options}
          defaultValue={defaultValue}
        />
        {error && (
          <p className="absolute bottom-0 left-0 text-red-500 text-s mt-1 max-w-full">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
