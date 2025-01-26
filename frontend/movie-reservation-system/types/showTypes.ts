export interface Show {
  id: number;
  startTime: string;
  endTime: string;
  cinemaRoomId: number;
  minSeatPrice: number;
}

export type ShowList = Show[];
