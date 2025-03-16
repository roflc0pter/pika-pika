export enum Q_KEY {
  "pokemon" = "pokemon",
  "typeEffectiveness" = "typeEffectiveness",
  "pokemonByType" = "pokemonByType",
}

export type TQueryParams = {
  limit: number;
  offset: number;
};

export type TPaginated = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};
