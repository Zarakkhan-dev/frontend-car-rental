import { apiSlice } from "./apiSlice"; 
import { MAINTENANCES_ENDPOINT } from "../constants";

export const maintenancesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMaintenance: builder.mutation({
      query: (maintenanceData) => ({
        url: `${MAINTENANCES_ENDPOINT}`,
        method: "POST",
        body: maintenanceData,
      }),
    }),

    getAllMaintenanceRecords: builder.query({
      query: () => ({
        url: `${MAINTENANCES_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getMaintenanceById: builder.query({
      query: (id) => ({
        url: `${MAINTENANCES_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateMaintenance: builder.mutation({
      query: ({ id, maintenanceData }) => ({
        url: `${MAINTENANCES_ENDPOINT}/${id}`,
        method: "PUT",
        body: maintenanceData,
      }),
    }),

    deleteMaintenance: builder.mutation({
      query: (id) => ({
        url: `${MAINTENANCES_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateMaintenanceMutation,
  useGetAllMaintenanceRecordsQuery,
  useGetMaintenanceByIdQuery,
  useUpdateMaintenanceMutation,
  useDeleteMaintenanceMutation,
} = maintenancesApiSlice;
