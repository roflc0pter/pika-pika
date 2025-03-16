import { Typography } from "antd";
import { FC } from "react";
import { IPokemon } from "types/pokemon.type";
import { PokeAbility } from "./poke-ability";

interface PokeAbilitiesProps {
  pokeAbilities?: IPokemon["abilities"];
}
export const PokeAbilities: FC<PokeAbilitiesProps> = ({ pokeAbilities }) => {
  if (!pokeAbilities?.length) {
    return <Typography.Text italic>No abilities</Typography.Text>;
  }

  return (
    <div role="list">
      {pokeAbilities?.map((ability) => (
        <div role="listitem" key={ability.ability.name}>
          <PokeAbility pokeAbility={ability} />
        </div>
      ))}
    </div>
  );
};
