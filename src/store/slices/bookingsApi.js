import { apiSlice } from "./apiSlice";  
import { BOOKINGS_ENDPOINT } from "../constants";  

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: `${BOOKINGS_ENDPOINT}`,
        method: "POST",
        body: bookingData,
      }),
    }),

    getAllBookings: builder.query({
      query: () => ({
        url: `${BOOKINGS_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getBookingById: builder.query({
      query: (id) => ({
        url: `${BOOKINGS_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateBooking: builder.mutation({
      query: ({ id, bookingData }) => ({
        url: `${BOOKINGS_ENDPOINT}/${id}`,
        method: "PUT",
        body: bookingData,
      }),
    }),

    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `${BOOKINGS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApiSlice;
