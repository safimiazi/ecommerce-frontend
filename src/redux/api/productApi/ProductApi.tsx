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
        url: `/product/delete_product/${id}`,
        method: "DELETE",
      }),
    }),
    getproductData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/product/get_products",
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
    useGetSingleproductDataQuery
} = ProductApi;
