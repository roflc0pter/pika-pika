import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAbility } from "apis/ability.api";
import { Q_KEY } from "types/query.type";

export const useFetchAbility = (ability: string | null) => {
  return useQuery({
    queryFn: () => fetchAbility(ability!),
    queryKey: [Q_KEY.pokemonByType, ability],
    placeholderData: keepPreviousData,
    enabled: !!ability,
    staleTime: Infinity,
  });
};
