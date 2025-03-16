import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { Q_KEY, TQueryParams } from "types/query.type";
import { fetchPokemon, fetchPokemons } from "apis/pokemon.api";

export const useFetchInfinitePokemons = (
  params: TQueryParams = { limit: 20, offset: 0 },
) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => fetchPokemons(pageParam),
    queryKey: [Q_KEY.pokemon, params],
    initialPageParam: params,
    getNextPageParam: (_, __, lastPageParam) => {
      return {
        offset: lastPageParam.offset + lastPageParam.limit,
        limit: lastPageParam.limit,
      };
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      return {
        offset: firstPageParam.offset - firstPageParam.limit,
        limit: firstPageParam.limit,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
};

export const useFetchPokemons = (params?: TQueryParams) => {
  return useQuery({
    queryFn: () => fetchPokemons(params),
    queryKey: [Q_KEY.pokemon, params],
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
};

export const useFetchPokemon = (name: string) => {
  return useQuery({
    queryFn: () => fetchPokemon(name),
    queryKey: [Q_KEY.pokemon, name],
    placeholderData: keepPreviousData,
    enabled: !!name,
    staleTime: Infinity,
  });
};

export const useFetchManyPokemon = (names: string[] = []) => {
  return useQueries({
    queries: names.map((name) => ({
      queryFn: () => fetchPokemon(name),
      queryKey: [Q_KEY.pokemon, name],
      placeholderData: keepPreviousData,
      staleTime: Infinity,
    })),
  });
};
