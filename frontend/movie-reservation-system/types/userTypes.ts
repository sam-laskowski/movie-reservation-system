export interface Booking {
  bookingId: number;
  movieTitle: string;
  seatPrice: number;
  seatType: string;
  showTime: string;
  userId: number;
}

export type UserBookings = Booking[];
