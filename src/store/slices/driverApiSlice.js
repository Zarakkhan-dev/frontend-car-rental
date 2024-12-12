import { apiSlice } from "./apiSlice";
import { DRIVER_ENDPOINT } from "../constants"; 

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDriver: builder.mutation({
      query: (driverData) => ({
        url: `${DRIVER_ENDPOINT}`,
        method: "POST",
        body: driverData,
      }),
    }),

    getAllDrivers: builder.query({
      query: () => ({
        url: `${DRIVER_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getDriverById: builder.query({
      query: (id) => ({
        url: `${DRIVER_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateDriver: builder.mutation({
      query: ({ id, driverData }) => ({
        url: `${DRIVER_ENDPOINT}/${id}`,
        method: "PUT",
        body: driverData,
      }),
    }),

    deleteDriver: builder.mutation({
      query: (id) => ({
        url: `${DRIVER_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateDriverMutation,
  useGetAllDriversQuery,
  useGetDriverByIdQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApiSlice;
