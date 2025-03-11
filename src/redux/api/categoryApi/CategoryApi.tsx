import { baseApi } from "../baseApi";

const CategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    categoryPost: build.mutation({
      query: (data) => {
        return {
          url: "/category/post_category",
          method: "POST",
          body: data,
        };
      },
    }),
    categoryPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/category/put_category/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    categoryDelete: build.mutation({
      query: ({ id }) => ({
        url: `/category/delete_category/${id}`,
        method: "DELETE",
      }),
    }),
    getCategoryData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/category/get_category",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex,
          searchTerm: search,
          isDelete
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useCategoryDeleteMutation,
  useCategoryPostMutation,
  useCategoryPutMutation,
  useGetCategoryDataQuery,
} = CategoryApi;
