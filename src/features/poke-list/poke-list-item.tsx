import { useNavigate } from "@tanstack/react-router";
import { Card } from "antd";
import clsx from "clsx";
import { PokeCover } from "features/poke-cover";
import { useFetchPokemon } from "hooks/pokemon.hook";
import { FC } from "react";
import styles from "./styles.module.css";

interface PokeListItemProps {
  name: string;
  size?: "small" | "middle";
}

export const PokeListItem: FC<PokeListItemProps> = ({
  name,
  size = "middle",
}) => {
  const { data: pokemon, isLoading } = useFetchPokemon(name);
  const navigate = useNavigate({ from: "/pokemons" });

  if (!pokemon && !isLoading) {
    return null;
  }

  const handleCardClick = () => {
    if (!pokemon?.name) {
      return;
    }
    navigate({ to: "$name", params: { name: pokemon.name } });
  };

  const className = clsx(styles["poke-list-item"], {
    [styles["small"]]: size === "small",
  });

  return (
    <div role="listitem">
      <Card
        size={size === "small" ? "small" : "default"}
        className={className}
        onClick={handleCardClick}
        loading={isLoading}
        hoverable
        role="button"
        tabIndex={0}
        aria-label={`View details of ${pokemon?.name}`}
      >
        <PokeCover pokemon={pokemon} size={size} />
      </Card>
    </div>
  );
};
