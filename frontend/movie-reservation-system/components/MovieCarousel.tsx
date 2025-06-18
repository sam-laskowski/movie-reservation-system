"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Movie } from "@/types/movieTypes"
import { fetchMovies } from "@/actions/actions"
import Image from "next/image"

export default function MovieCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies()
        if (moviesData) {
          // Only take the first 5 movies
          setMovies(moviesData.slice(0, 5))
        }
      } catch (error) {
        console.error("Failed to load movies", error)
      }
    }
    loadMovies()
  }, [])

  useEffect(() => {
    console.log(movies)
  }, [movies])

  // Set up autoplay
  useEffect(() => {
    if (!api) return

    // Update current slide index when the carousel scrolls
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })

    // Set up autoplay interval
    const autoplayInterval = setInterval(() => {
      api.scrollNext()
    }, 8000)

    // Clean up interval on unmount
    return () => clearInterval(autoplayInterval)
  }, [api])

  return (
    <div className="relative w-full h-[30vh] sm:h-[60vh] bg-black">
      <Carousel
        setApi={setApi}
        className="w-full h-full relative w-full lg:w-[65vw] xl:w-[51vw] left-1/2 -translate-x-1/2"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="w-full h-[30vh] sm:h-[60vh]">
          <CarouselItem className="w-full h-full relative">
            {movies[0] && (
              <>
                <Image
                  className="w-full h-full object-contain"
                  src={movies[0].backdropImage}
                  alt={movies[0].title}
                  width={500}
                  height={300}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">{movies[0].title}</h2>
                  <Button className="bg-white text-black hover:bg-white/90">Book Seats</Button>
                </div>
              </>
            )}
          </CarouselItem>

          <CarouselItem className="w-full h-full relative">
            {movies[1] && (
              <>
                  <Image
                    className="w-full h-full object-contain"
                    src={movies[1].backdropImage}
                    alt={movies[1].title}
                    width={500}
                    height={300}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">{movies[1].title}</h2>
                  <Button className="bg-white text-black hover:bg-white/90">Book Seats</Button>
                </div>
              </>
            )}
          </CarouselItem>

          <CarouselItem className="w-full h-full relative">
            {movies[2] && (
              <>
                  <Image
                    className="w-full h-full object-contain"
                    src={movies[2].backdropImage}
                    alt={movies[2].title}
                    width={500}
                    height={300}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">{movies[2].title}</h2>
                  <Button className="bg-white text-black hover:bg-white/90">Book Seats</Button>
                </div>
              </>
            )}
          </CarouselItem> 

          <CarouselItem className="w-full h-full relative">
            {movies[3] && (
              <>
                  <Image
                    className="w-full h-full object-contain"
                    src={movies[3].backdropImage}
                    alt={movies[3].title}
                    width={500}
                    height={300}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">{movies[3].title}</h2>
                  <Button className="bg-white text-black hover:bg-white/90">Book Seats</Button>
                </div>
              </>
            )}
          </CarouselItem>

          <CarouselItem className="w-full h-full relative">
            {movies[4] && (
              <>
                  <Image
                    className="w-full h-full object-contain"
                    src={movies[4].backdropImage}
                    alt={movies[4].title}
                    width={500}
                    height={300}
                  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <h2 className="text-white text-3xl font-bold drop-shadow-lg">{movies[4].title}</h2>
                  <Button className="bg-white text-black hover:bg-white/90">Book Seats</Button>
                </div>
              </>
            )}
          </CarouselItem>
        </CarouselContent>

        {/* Navigation arrows */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
          <CarouselPrevious className="bg-black/30 text-white hover:bg-black/50 border-none" />
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
          <CarouselNext className="bg-black/30 text-white hover:bg-black/50 border-none" />
        </div>

        {/* Indicators */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all ${current === index ? "bg-white w-4" : "bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
