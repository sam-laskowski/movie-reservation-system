"use client";
import { createShowing } from "@/actions/actions";
import React, { useActionState } from "react";

export default function AddShowing() {
  const [state, createShowAction, pending] = useActionState(
    createShowing,
    undefined
  );

  return (
    <div className="p-10 pt-40 text-white flex justify-center items-center">
      <form action={createShowAction}>
        <FormField
          id="cinemaRoomId"
          label="Cinema Room ID"
          type="number"
          error={state?.errors?.cinemaRoomId}
          defaultValue={
            state?.errors?.cinemaRoomId
              ? ""
              : Number(state?.data?.cinemaRoomId) || ""
          }
        />
        <FormField
          id="movieId"
          label="Movie ID"
          type="number"
          error={state?.errors?.movieId}
          defaultValue={
            state?.errors?.movieId ? "" : Number(state?.data?.movieId) || ""
          }
        />
        <label className="block text-sm font-medium mb-1">
          Show Start Time and Date
        </label>

        <input
          id="startDate"
          name="startDate"
          type="date"
          className="w-full text-black p-2 ring-2 ring-orange-400"
        />
        <input
          id="startTime"
          name="startTime"
          type="time"
          className="w-full text-black p-2 ring-2 ring-orange-400"
        />
        <label className="block text-sm font-medium mb-1">
          Show End Time and Date
        </label>
        <input
          id="endDate"
          name="endDate"
          type="date"
          className="w-full text-black p-2 ring-2 ring-orange-400"
        />
        <input
          id="endTime"
          name="endTime"
          type="time"
          className="w-full text-black p-2 ring-2 ring-orange-400"
        />

        <button
          type="submit"
          disabled={pending}
        >
          {pending ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  error?: string[];
  defaultValue?: string | number;
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

// function FormFieldDateTime() {
//   return (
//     <div className="relative lg:h-[95px] md:h-[95px] sm:h-[95px] h-[115px]">
//         <label
//           htmlFor={id}
//           className="block text-sm font-medium mb-1"
//         >
//           {label}
//         </label>
//         <input
//           id={id}
//           name={id}
//           type={type}
//           placeholder={label}
//           defaultValue={defaultValue}
//           className="w-full text-black p-2 ring-2 ring-orange-400"
//         />
//         {error && (
//           <p className="absolute bottom-0 left-0 text-red-500 text-s mt-1 max-w-full">
//             {error}
//           </p>
//         )}
//       </div>
//   )
// }
