export interface BookingResponse {
  status: string;
  bookings: CurrentBookings[];
}

export interface CurrentBookings {
  booking_id: number;
  booking_date: string;
  booking_code: string;
  booking_duration_hours: number;
  booking_timestamp: string;
  user_id: number;
  booking_box_id_fk: number;
  booking_start_hour: number;
  booking_end_hour: number;
}

/* Confirmed Booking */

export interface ConfirmedStoreResponse {
  booking_id: number;
  booking_box_id_fk: number;
  booking_code: string;
  booking_duration_hours: number;
  booking_timestamp: string;
  user_id: number;
  booking_date: string;
  booking_start_hour: number;
  booking_end_hour: number;
}
