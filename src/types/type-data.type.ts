import { INamedAPIResource } from "./named-api-resource.type";

interface ITypeDamageRelations {
  double_damage_from: INamedAPIResource[];
  double_damage_to: INamedAPIResource[];
  half_damage_from: INamedAPIResource[];
  half_damage_to: INamedAPIResource[];
  no_damage_from: INamedAPIResource[];
  no_damage_to: INamedAPIResource[];
}

interface IGameIndex {
  game_index: number;
  generation: INamedAPIResource;
}

interface IMoveDamageClass {
  name: string;
  url: string;
}

interface IPokemonTypeInfo {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface ITypeData {
  id: number;
  name: string;
  damage_relations: ITypeDamageRelations;
  game_indices: IGameIndex[];
  generation: INamedAPIResource;
  move_damage_class: IMoveDamageClass;
  moves: INamedAPIResource[];
  pokemon: IPokemonTypeInfo[];
  sprites?: ITypeSprites;
}

interface ITypeSprites {
  [generation: string]: {
    [game: string]: {
      name_icon: string;
    };
  };
}
