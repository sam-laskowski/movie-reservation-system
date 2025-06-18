"use client";
import { addMovie } from "@/actions/actions";
import React, { useActionState, useState } from "react";
import EnumSelector from "./EnumSelector";
import { AgeRating, Genre } from "@/types/movieTypes";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

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

  // Handle form submission success
  React.useEffect(() => {
    if (state === null) {
      toast.success("Movie added successfully!", {
        duration: 3000,
      });
    }
  }, [state]);

  return (
    <div className="p-10 pt-40 text-white flex justify-center items-center">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-2xl bg-black border-2 border-[#767676] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Movie</h2>
        <form action={addMovieAction} className="space-y-6">
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
            label="Duration (minutes)"
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

          <Button
            type="submit"
            disabled={pending}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Adding..." : "Add Movie"}
          </Button>
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
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={label}
        defaultValue={defaultValue}
        className="w-full bg-black border-2 border-[#767676] rounded-md p-2 text-white focus:border-orange-500 focus:outline-none"
      />
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
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
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
      >
        {label}
      </label>
      <EnumSelector
        name={id}
        options={options}
        defaultValue={defaultValue}
      />
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
