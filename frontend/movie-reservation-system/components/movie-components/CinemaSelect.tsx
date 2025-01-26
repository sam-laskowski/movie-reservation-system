"use client";

import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CinemaList } from "@/types/cinemaTypes";
import { useRouter } from "next/navigation";

export default function CinemaSelect({
  allCinemas,
  movieId,
  cinemaId,
}: {
  allCinemas: CinemaList;
  movieId: number;
  cinemaId: number;
}) {
  let cinemaLocation = allCinemas.filter((cinema) => cinema.id == cinemaId)[0]
    ?.locationName;
  if (cinemaLocation == undefined) {
    cinemaLocation = "";
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(cinemaLocation);
  const router = useRouter();
  //console.log(cinemaLocation);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? allCinemas.find((cinema) => cinema.locationName === value)
                ?.address
            : "Choose your Cinema"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No Cinema found.</CommandEmpty>
            <CommandGroup>
              {allCinemas.map((cinema) => (
                <CommandItem
                  key={cinema.locationName}
                  value={cinema.locationName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    router.push(`/movies/${movieId}/${cinema.id}`);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === cinema.locationName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {cinema.address}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
