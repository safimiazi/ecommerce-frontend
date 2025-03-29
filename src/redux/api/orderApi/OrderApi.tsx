import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),
    initiateSSLCommerz: build.mutation({
      query: (orderData) => ({
        url: "/payment/sslcommerz",
        method: "POST",
        body: orderData,
      }),
    }),
  }),

  overrideExisting: false,
});

export const { usePlaceOrderMutation, useInitiateSSLCommerzMutation } =
  orderApi;
