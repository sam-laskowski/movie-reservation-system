"use client";
import React, { useState } from "react";

interface Props {
  options: string[];
  name: string;
  defaultValue?: string;
}

export default function EnumSelector({
  options,
  name,
  defaultValue = "",
}: Props) {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <div>
      <input
        type="hidden"
        name={name}
        value={selected}
      />

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button" // Important: prevent form submission
            onClick={() => handleSelect(option)}
            className={`px-3 py-1 rounded border capitalize ${
              selected === option
                ? "bg-orange-400 text-white border-orange-400"
                : "bg-white text-black border-gray-300 hover:border-orange-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* {selected && (
        <p className="mt-2 text-sm text-gray-300">Selected: {selected}</p>
      )} */}
    </div>
  );
}
