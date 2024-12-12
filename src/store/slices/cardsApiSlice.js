import { apiSlice } from "./apiSlice";  
import { CARD_ENDPOINT } from "../constants";

export const cardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCard: builder.mutation({
      query: (cardData) => ({
        url: `${CARD_ENDPOINT}`,
        method: "POST",
        body: cardData,
      }),
    }),

    getAllCards: builder.query({
      query: () => ({
        url: `${CARD_ENDPOINT}`,
        method: "GET",
      }),
    }),

    getCardById: builder.query({
      query: (id) => ({
        url: `${CARD_ENDPOINT}/${id}`,
        method: "GET",
      }),
    }),

    updateCard: builder.mutation({
      query: ({ id, cardData }) => ({
        url: `${CARD_ENDPOINT}/${id}`,
        method: "PUT",
        body: cardData,
      }),
    }),

    deleteCard: builder.mutation({
      query: (id) => ({
        url: `${CARD_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCardMutation,
  useGetAllCardsQuery,
  useGetCardByIdQuery,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApiSlice;
