"use client";
import { createShowing } from "@/actions/actions";
import React, { useActionState, useEffect, useState } from "react";
import { Movie, MovieList } from "@/types/movieTypes";
import { CinemaList } from "@/types/cinemaTypes";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"

export default function AddShowing() {
  const [state, createShowAction, pending] = useActionState(
    createShowing,
    undefined
  );
  const [movies, setMovies] = useState<MovieList>([]);
  const [cinemas, setCinemas] = useState<CinemaList>([]);
  const [error, setError] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [startDateTime, setStartDateTime] = useState<{ date: string; time: string }>({ date: "", time: "" });
  const [endDateTime, setEndDateTime] = useState<{ date: string; time: string }>({ date: "", time: "" });

  // Handle form submission success
  useEffect(() => {
    if (state === null) {
      toast.success("Showing added successfully!", {
        description: `${selectedMovie?.title} at ${startDateTime.time}`,
        duration: 3000,
      });
      // Reset form
      setSelectedMovie(null);
      setStartDateTime({ date: "", time: "" });
      setEndDateTime({ date: "", time: "" });
    }
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, cinemasRes] = await Promise.allSettled([
          fetch("/api/movies/all-movies"),
          fetch("/api/cinemas/all-cinemas")
        ]);

        if (moviesRes.status === 'fulfilled' && moviesRes.value.ok) {
          const moviesData = await moviesRes.value.json();
          setMovies(moviesData);
        } else {
          console.error('Failed to fetch movies:', moviesRes.status === 'rejected' ? moviesRes.reason : 'Request failed');
        }

        if (cinemasRes.status === 'fulfilled' && cinemasRes.value.ok) {
          const cinemasData = await cinemasRes.value.json();
          setCinemas(cinemasData);
        } else {
          console.error('Failed to fetch cinemas:', cinemasRes.status === 'rejected' ? cinemasRes.reason : 'Request failed');
        }

        if (moviesRes.status === 'rejected' && cinemasRes.status === 'rejected') {
          setError("Failed to load data. Please try again later.");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("An unexpected error occurred. Please try again later.");
      }
    };
    fetchData();
  }, []);

  // Calculate end time whenever movie or start time changes
  useEffect(() => {
    if (selectedMovie && startDateTime.date && startDateTime.time) {
      const startDate = new Date(`${startDateTime.date}T${startDateTime.time}`);
      const endDate = new Date(startDate.getTime() + selectedMovie.duration * 60000); // Convert duration (minutes) to milliseconds

      setEndDateTime({
        date: endDate.toISOString().split('T')[0],
        time: endDate.toTimeString().slice(0, 5)
      });
    }
  }, [selectedMovie, startDateTime]);

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const movieId = parseInt(e.target.value);
    const movie = movies.find(m => m.id === movieId) || null;
    setSelectedMovie(movie);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateTime(prev => ({ ...prev, date: e.target.value }));
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateTime(prev => ({ ...prev, time: e.target.value }));
  };

  return (
    <div className="p-10 pt-40 text-white flex justify-center items-center">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-2xl bg-black border-2 border-[#767676] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Showing</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-md text-red-500 text-center">
            {error}
          </div>
        )}
        <form action={createShowAction} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="movieId" className="block text-sm font-medium">
              Select Movie
            </label>
            <select
              id="movieId"
              name="movieId"
              className="w-full bg-black border-2 border-[#767676] rounded-md p-2 text-white focus:border-orange-500 focus:outline-none"
              disabled={movies.length === 0}
              onChange={handleMovieChange}
              value={selectedMovie?.id || ""}
            >
              <option value="">Choose a movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} ({movie.duration} mins)
                </option>
              ))}
            </select>
            {state?.errors?.movieId && (
              <p className="text-red-500 text-sm">{state.errors.movieId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="cinemaRoomId" className="block text-sm font-medium">
              Select Cinema Room
            </label>
            <select
              id="cinemaRoomId"
              name="cinemaRoomId"
              className="w-full bg-black border-2 border-[#767676] rounded-md p-2 text-white focus:border-orange-500 focus:outline-none"
              disabled={cinemas.length === 0}
            >
              <option value="">Choose a cinema room</option>
              {cinemas.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.locationName} - {cinema.address}
                </option>
              ))}
            </select>
            {state?.errors?.cinemaRoomId && (
              <p className="text-red-500 text-sm">{state.errors.cinemaRoomId}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Show Start Time</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  className="w-full text-black p-2 ring-2 ring-orange-400 rounded-md"
                  onChange={handleStartDateChange}
                  value={startDateTime.date}
                />
              </div>
              <div>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  className="w-full text-black p-2 ring-2 ring-orange-400 rounded-md"
                  onChange={handleStartTimeChange}
                  value={startDateTime.time}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Show End Time (Calculated)</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  className="w-full text-black p-2 ring-2 ring-orange-400 rounded-md bg-gray-100"
                  value={endDateTime.date}
                  readOnly
                />
              </div>
              <div>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  className="w-full text-black p-2 ring-2 ring-orange-400 rounded-md bg-gray-100"
                  value={endDateTime.time}
                  readOnly
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending || movies.length === 0 || cinemas.length === 0 || !selectedMovie || !startDateTime.date || !startDateTime.time}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Adding..." : "Add Showing"}
          </Button>
        </form>
      </div>
    </div>
  );
}
