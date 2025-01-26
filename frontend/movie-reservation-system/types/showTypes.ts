export interface Show {
  id: number;
  movieId: number;
  startTime: string;
  endTime: string;
  cinemaRoomId: number;
  minSeatPrice: number;
}

export type ShowList = Show[];
