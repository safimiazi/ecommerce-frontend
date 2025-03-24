import { baseApi } from "../baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    wishlistPost: build.mutation({
      query: (data) => {
        return {
          url: "/wishlist/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["wishlist"],
    }),
    wishlistUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/wishlist/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    wishlistDelete: build.mutation({
      query: ({ id }) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/wishlist/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getwishlistData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/wishlist",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),

    getSinglewishlistData: build.query({
      query: ({ id }) => ({
        url: `/wishlist/${id}`,
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
  }),

  overrideExisting: false,
});

export const {
    useWishlistDeleteMutation,
    useWishlistPostMutation,
    useWishlistUpdateMutation,
    useGetwishlistDataQuery,
    useBulkDeleteMutation,
    useGetSinglewishlistDataQuery,

} = wishlistApi;
