export interface Booking {
  bookingId: number;
  movieTitle: string;
  seatPrice: number;
  seatType: string;
  showTime: string;
  userId: number;
}

export type UserBookings = Booking[];

export type User = {
  id: string;
  role: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};
