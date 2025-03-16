import { INamedAPIResource } from "./named-api-resource.type";

export interface IAbility {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: INamedAPIResource;
  names: IAbilityName[];
  effect_entries: IVerboseEffect[];
  effect_changes: IAbilityEffectChange[];
  flavor_text_entries: IAbilityFlavorText[];
  pokemon: IAbilityPokemon[];
}

interface IAbilityName {
  name: string;
  language: INamedAPIResource;
}

interface IVerboseEffect {
  effect: string;
  short_effect: string;
  language: INamedAPIResource;
}

interface IAbilityEffectChange {
  effect_entries: IEffect[];
  version_group: INamedAPIResource;
}

interface IEffect {
  effect: string;
  language: INamedAPIResource;
}

interface IAbilityFlavorText {
  flavor_text: string;
  language: INamedAPIResource;
  version_group: INamedAPIResource;
}

interface IAbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: INamedAPIResource;
}
