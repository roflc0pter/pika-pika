import { Card, Divider } from "antd";
import { PokeAbilities } from "components/poke-abilities";
import { PokeStats } from "components/poke-stats";
import { PokeCover } from "features/poke-cover";
import { FC } from "react";
import { useFetchPokemon } from "hooks/pokemon.hook";
import styles from "./styles.module.css";

interface PokeCardProps {
  name: string;
}
export const PokeCard: FC<PokeCardProps> = ({ name }) => {
  const { data: pokemon, isLoading } = useFetchPokemon(name);

  return (
    <Card loading={isLoading} className={styles["poke-card"]}>
      <PokeCover pokemon={pokemon} />
      <section aria-labelledby="poke-abilities">
        <Divider>
          <span id="poke-abilities" role="heading" aria-level={2}>
            Abilities
          </span>
        </Divider>
        <PokeAbilities pokeAbilities={pokemon?.abilities} />
      </section>
      <section aria-labelledby="poke-stats">
        <Divider>
          <span id="poke-stats" role="heading" aria-level={2}>
            Stats
          </span>
        </Divider>
        <PokeStats stats={pokemon?.stats} />
      </section>
    </Card>
  );
};
