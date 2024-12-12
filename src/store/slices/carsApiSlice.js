import { apiSlice } from "./apiSlice";
import { CARS_ENDPOINT } from "../constants";

export const carsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (carData) => ({
        url: `${CARS_ENDPOINT}`,
        method: "POST",
        body: carData,
      }),
    }),

    getAllCars: builder.query({
      query: () => ({
        url: `${CARS_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getCarById: builder.query({
      query: (id) => ({
        url: `${CARS_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateCar: builder.mutation({
      query: ({ id, carData }) => ({
        url: `${CARS_ENDPOINT}/${id}`,
        method: "PUT",
        body: carData,
      }),
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `${CARS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carsApiSlice;
