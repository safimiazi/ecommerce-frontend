import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (orderData) => ({
        url: "/orders/create",
        method: "POST",
        body: orderData,
      }),
    }),
    initiateSSLCommerz: build.mutation({
      query: (orderData) => ({
        url: "/orders/sslcommerz",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/orders/get_orders",
        method: "GET",
        params: {
          pageSize,
          pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const { usePlaceOrderMutation, useInitiateSSLCommerzMutation, useGetOrderDataQuery } =
  orderApi;
