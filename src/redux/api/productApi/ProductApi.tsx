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
    productPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/product/put_product/${id}`,
        method: "PUT",
        body: data,
      }),
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
        method: "DELETE",
        body: { ids },
      }),
    }),
    getproductData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/product",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex ,
          searchTerm: search ,
          isDelete
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
    useProductPutMutation,
    useProductDeleteMutation,
    useGetproductDataQuery,
    useGetSingleproductDataQuery,
    useBulkDeleteMutation
} = ProductApi;
