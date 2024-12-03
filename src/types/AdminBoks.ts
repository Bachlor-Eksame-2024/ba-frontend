export interface Boks {
  box_number: number;
  box_availability: string;
  fitness_center_fk: number;
  box_id: number;
  created_at: string;
}

export interface BoksData {
  box_id: number;
  dates: bokDate;
}
export interface bokDate {
  [date: string]: BoksTime;
}
export interface BoksTime {
  [time: string]: BoksAvailabilty;
}
export interface BoksAvailabilty {
  available: boolean;
  booking: Boksbooking | null;
}

interface Boksbooking {
  start_hour: number;
  duration: number;
  end_hour: number;
}
