import { apiSlice } from "./apiSlice";
import { FUELINGS_ENDPOINT } from "../constants"; 

export const fuelingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFueling: builder.mutation({
      query: (fuelingData) => ({
        url: `${FUELINGS_ENDPOINT}`,
        method: "POST",
        body: fuelingData,
      }),
    }),

    getAllFuelings: builder.query({
      query: () => ({
        url: `${FUELINGS_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getFuelingById: builder.query({
      query: (id) => ({
        url: `${FUELINGS_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateFueling: builder.mutation({
      query: ({ id, fuelingData }) => ({
        url: `${FUELINGS_ENDPOINT}/${id}`,
        method: "PUT",
        body: fuelingData,
      }),
    }),

    deleteFueling: builder.mutation({
      query: (id) => ({
        url: `${FUELINGS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFuelingMutation,
  useGetAllFuelingsQuery,
  useGetFuelingByIdQuery,
  useUpdateFuelingMutation,
  useDeleteFuelingMutation,
} = fuelingApiSlice;
