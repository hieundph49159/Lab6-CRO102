import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.0.104:3000/pokemon', // Đảm bảo URL API chính xác
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonType, string>({
      query: (name) => `?name=${name.toLowerCase()}`, // Đảm bảo tên Pokémon được truyền dưới dạng chữ thường
      transformResponse: (response: PokemonType[]) => {
        if (Array.isArray(response)) {
          return response[0]; // Nếu phản hồi là mảng, lấy Pokémon đầu tiên
        }
        return response; // Nếu không phải mảng, trả về phản hồi gốc
      },
    }),
  }),
});

export interface PokemonType {
  id: number;
  name: string;
  type: string;
  abilities: string[];
  height: number;
  weight: number;
  image: string;
}

export default pokemonApi;

export const { useLazyGetPokemonByNameQuery } = pokemonApi;
