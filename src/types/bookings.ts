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

/* {
    "status": "success",
    "bookings": [
        {
            "booking_id": 6067,
            "booking_date": "2024-12-13T10:39:40.421952",
            "booking_code": "914F",
            "booking_duration_hours": 3,
            "booking_timestamp": "2024-12-06T08:26:43.694900",
            "user_id": 631,
            "booking_box_id_fk": 86,
            "booking_start_hour": 12,
            "booking_end_hour": 15
        }
    ]
} */
