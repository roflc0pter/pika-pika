import { theme, Tooltip, Typography } from "antd";
import { useFetchAbility } from "hooks/ability.hook";
import { filterByLanguage } from "libs/utils";
import { FC } from "react";
import { IPokemonAbility } from "types/pokemon.type";

interface PokeAbilityProps {
  pokeAbility: IPokemonAbility;
}

export const PokeAbility: FC<PokeAbilityProps> = ({ pokeAbility }) => {
  const {
    token: { marginXS },
  } = theme.useToken();
  const { data: ability } = useFetchAbility(pokeAbility.ability.name);

  const name = filterByLanguage(ability?.names)?.name;
  const flavorText = filterByLanguage(
    ability?.flavor_text_entries,
  )?.flavor_text;
  const effectText = filterByLanguage(ability?.effect_entries)?.effect;

  return (
    <div style={{ marginBottom: marginXS }}>
      <Tooltip title={effectText} aria-label={`Effect: ${effectText}`}>
        <Typography.Text strong>{name}</Typography.Text>
      </Tooltip>
      {flavorText && <Typography.Paragraph>{flavorText}</Typography.Paragraph>}
    </div>
  );
};
