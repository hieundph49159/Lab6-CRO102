import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the type for our user data
interface UserData {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
}

// Create the API using RTK Query
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.0.104:3000' }),
  endpoints: (builder) => ({
    // Define the signup mutation
    signup: builder.mutation<any, UserData>({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

// Export the generated hook
export const { useSignupMutation } = api;