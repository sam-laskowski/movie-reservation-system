export type UserBooking = {
  userId: number;
  bookingId: number;
  seatType: string;
  seatPrice: number;
  showTime: Date;
  movieTitle: string;
};

export type UserBookingList = UserBooking[];
