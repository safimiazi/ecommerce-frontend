import { baseApi } from "../baseApi";

const ProductApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    productPost: build.mutation({
      query: (data) => {
        return {
          url: "/product/create",
          method: "POST",
          body: data,
        };
      },
    }),
    ProductUpdate: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/product/update/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    productDelete: build.mutation({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
    bulkDelete: build.mutation({
      query: ({ ids }) => ({
        url: `/product/bulk`,
        method: "POST",
        body: { ids },
      }),
    }),
    getproductData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/product",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
        },
      }),
    }),
    getProductByCategory: build.query({
      query: ({ pageIndex, pageSize, search, isDelete, id }) => ({
        url: `/product/products`,
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete,
          id,
        },
      }),
    }),
    getSingleproductData: build.query({
      query: ({ id }) => ({
        url: `/product/get_product/${id}`,
        method: "GET",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useProductPostMutation,
  useProductUpdateMutation,
  useProductDeleteMutation,
  useGetproductDataQuery,
  useGetSingleproductDataQuery,
  useBulkDeleteMutation,
  useGetProductByCategoryQuery,
} = ProductApi;
