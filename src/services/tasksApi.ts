import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../constants/interfaces/Task';

export const tasksApi = createApi({
  reducerPath: 'tasksReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  tagTypes: ['Task'],
  endpoints: builder => ({
    getTasks: builder.query({
      async queryFn(arg, api, extraOptions, baseQuery) {
        // adding delay for showing loader
        await new Promise(resolve => setTimeout(resolve, 2000));

        const result = await baseQuery({ url: 'todos' });

        if (result.error) return { error: result.error };
        return { data: result.data as Task[] }; // cast to Task[]
      },
      providesTags: ['Task'],
    }),

    addTask: builder.mutation({
      query: body => ({
        url: `todos`,
        method: 'POST',
        body,
      }),
      // invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body,
      }),
      // invalidatesTags: ['Task'],
    }),

    deleteTask: builder.mutation({
      query: id => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useLazyGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
