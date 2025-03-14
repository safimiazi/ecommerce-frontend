import { baseApi } from "../baseApi";

const AttributeOptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    attributeOptionPost: build.mutation({
      query: (data) => {
        return {
          url: "/attributeOption/post_attributeOption",
          method: "POST",
          body: data,
        };
      },
    }),
    attributeOptionPut: build.mutation({
      query: ({ data, id }) => ({
        url: `/attributeOption/put_attributeOption/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    attributeOptionDelete: build.mutation({
      query: ({ id }) => ({
        url: `/attributeOption/delete_attributeOption/${id}`,
        method: "DELETE",
      }),
    }),
    getattributeOptionData: build.query({
      query: ({ pageIndex, pageSize, search, isDelete }) => ({
        url: "/attributeOption/get_attributeOption",
        method: "GET",
        params: {
          limit: pageSize,
          page: pageIndex ,
          searchTerm: search ,
          isDelete
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
useAttributeOptionDeleteMutation,
useAttributeOptionPostMutation,
useAttributeOptionPutMutation,
useGetattributeOptionDataQuery
} = AttributeOptionApi;
