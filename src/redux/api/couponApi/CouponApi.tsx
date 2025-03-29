import { baseApi } from "../baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    couponPost: build.mutation({
      query: (data) => {
        return {
          url: "/coupon/create",
          method: "POST",
          body: data,
        };
      },
    }),
    couponUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/coupon/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    couponDelete: build.mutation({
      query: ({ id }) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/coupon/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getcouponData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/coupon",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useCouponPostMutation,
  useCouponUpdateMutation,
  useCouponDeleteMutation,
  useBulkDeleteMutation,
  useGetcouponDataQuery,
} = couponApi;
