export type UserBooking = {
  userId: number;
  bookingId: number;
  seatType: string;
  seatPrice: number;
  showTime: Date;
  movieTitle: string;
  moviePoster: string;
};

export type UserBookingList = UserBooking[];

export type BookingCardParams = {
  userId: number;
  bookingId: number;
  seatType: string;
  seatPrice: number;
  showTime: Date;
  movieTitle: string;
  moviePoster: string;
};
