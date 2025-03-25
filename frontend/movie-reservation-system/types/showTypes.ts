export interface Show {
  id: number;
  movieId: number;
  startTime: string;
  endTime: string;
  cinemaRoomId: number;
  minSeatPrice: number;
}

export type ShowList = Show[];

export interface Seat {
  id: number;
  type: string;
  status: string;
  price: number;
}

export type Seats = Seat[];
