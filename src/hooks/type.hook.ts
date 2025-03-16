import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { fetchType } from "apis/pokemon.api";
import { Q_KEY } from "types/query.type";

export const useFetchType = (type?: string) => {
  return useQuery({
    queryFn: () => fetchType(type!),
    queryKey: [Q_KEY.pokemonByType, type],
    placeholderData: keepPreviousData,
    enabled: !!type,
    staleTime: Infinity,
  });
};

export const useFetchManyType = (types: string[] = []) => {
  return useQueries({
    queries: types.map((type) => ({
      queryFn: () => fetchType(type!),
      queryKey: [Q_KEY.pokemonByType, type],
      placeholderData: keepPreviousData,
      enabled: !!type,
      staleTime: Infinity,
    })),
  });
};
