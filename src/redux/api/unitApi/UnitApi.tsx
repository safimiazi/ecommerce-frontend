import { baseApi } from "../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation({
      query: (data) => {
        return {
          url: "/unit/create",
          method: "POST",
          body: data,
        };
      },
    }),
    update: build.mutation({
      query: ({ data, id }) => ({
        url: `/unit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    delete: build.mutation({
      query: ({ id }) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
    }),
    bulkDelete: build.mutation({
      query: (ids) => ({
        url: `/unit/bulk`,
        method: "DELETE",
        body: { ids },
      }),
    }),
    getAll: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/unit",
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
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  useBulkDeleteMutation,
  useGetAllQuery,
} = unitApi;
