import { baseApi } from "../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    cartPost: build.mutation({
      query: (data) => {
        return {
          url: "/cart/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["cart"],
    }),
    cartUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/cart/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    cartDelete: build.mutation({
      query: ({ userId, productId }) => ({
        url: `/cart`,
        method: "POST",
        body: { userId, productId },
      }),
      invalidatesTags: ["cart"],
    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/cart/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getcartData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/cart",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),

    getSinglecartData: build.query({
      query: ({ id }) => ({
        url: `/cart/${id}`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCartDeleteMutation,
  useCartPostMutation,
  useCartUpdateMutation,
  useGetcartDataQuery,
  useBulkDeleteMutation,
} = cartApi;
