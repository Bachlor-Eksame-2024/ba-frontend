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
  booking_id: number;
  start_hour: number;
  duration: number;
  end_hour: number;
}

export interface BookingByID {
  booking_id: number;
  user_id: number;
  user_first_name: string;
  user_last_name: string;
  fitness_center_id: number;
  fitness_center_name: string;
  box_id: number;
  booking_date: string;
  booking_code: string;
  start_hour: number;
  duration_hours: number;
  end_hour: number;
}
