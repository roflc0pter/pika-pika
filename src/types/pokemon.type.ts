import { INamedAPIResource } from "types/named-api-resource.type";

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: IPokemonAbility[];
  forms: INamedAPIResource[];
  game_indices: IPokemonGameIndex[];
  held_items: IPokemonHeldItem[];
  location_area_encounters: string;
  moves: IPokemonMove[];
  species: INamedAPIResource;
  sprites: IPokemonSprites & { other?: IOtherSprites };
  stats: IPokemonStats[];
  types: IPokemonType[];
}

interface IOtherSprites {
  dream_world?: IPokemonSprites;
  home?: IPokemonSprites;
  "official-artwork"?: IPokemonSprites;
}

export interface IPokemonAbility {
  ability: INamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

interface IPokemonGameIndex {
  game_index: number;
  version: INamedAPIResource;
}

interface IPokemonHeldItem {
  item: INamedAPIResource;
  version_details: IPokemonHeldItemVersion[];
}

interface IPokemonHeldItemVersion {
  version: INamedAPIResource;
  rarity: number;
}

interface IPokemonMove {
  move: INamedAPIResource;
  version_group_details: IPokemonMoveVersion[];
}

interface IPokemonMoveVersion {
  move_learn_method: INamedAPIResource;
  version_group: INamedAPIResource;
  level_learned_at: number;
}

interface IPokemonSprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
}

interface IPokemonStats {
  base_stat: number;
  effort: number;
  stat: INamedAPIResource;
}

interface IPokemonType {
  slot: number;
  type: INamedAPIResource;
}
