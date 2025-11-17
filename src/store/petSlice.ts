import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;
const DOG_API_KEY = import.meta.env.VITE_DOG_API_KEY;

interface Pet {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  endpoints: (build) => ({
    getPets: build.query<
      Pet[],
      { type: "cat" | "dog"; limit?: number; page?: number; order?: string }
    >({
      query: ({ type, limit = 10, page = 1, order = "asc" }) => {
        const baseUrl =
          type === "cat"
            ? "https://api.thecatapi.com/v1"
            : "https://api.thedogapi.com/v1";
        return {
          url: `${baseUrl}/images/search`,
          params: { limit, page, order },
          headers: { "x-api-key": type === "cat" ? CAT_API_KEY : DOG_API_KEY },
        };
      },
    }),
    votePet: build.mutation<
      void,
      { type: "cat" | "dog"; image_id: string; sub_id?: string; value?: number }
    >({
      query: ({ type, ...body }) => {
        const baseUrl =
          type === "cat"
            ? "https://api.thecatapi.com/v1"
            : "https://api.thedogapi.com/v1";
        return {
          url: `${baseUrl}/votes`,
          method: "POST",
          body,
          headers: { "x-api-key": type === "cat" ? CAT_API_KEY : DOG_API_KEY },
        };
      },
    }),
  }),
});

export const { useGetPetsQuery, useVotePetMutation } = petApi;
