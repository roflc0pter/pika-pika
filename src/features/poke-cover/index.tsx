import { Flex, Image, Typography } from "antd";
import clsx from "clsx";
import { TypeLogo } from "features/type-logo";
import { capitalizeFirstLetter } from "libs/utils";
import { FC } from "react";
import { IPokemon } from "types/pokemon.type";
import styles from "./styles.module.css";

interface PokeCoverProps {
  pokemon?: IPokemon;
  size?: "small" | "middle";
}

export const PokeCover: FC<PokeCoverProps> = ({ pokemon, size = "middle" }) => {
  const typeNames = pokemon?.types.map((type) => type.type.name) || [];
  const logoUrl = pokemon?.sprites.other?.dream_world?.front_default;

  const wrapperClassName = clsx(styles["cover-image"], {
    [styles["small"]]: size === "small",
  });

  return (
    <Flex vertical gap={size}>
      {size !== "small" && (
        <Flex justify="space-between" gap="small">
          {typeNames.map((typeName) => (
            <TypeLogo key={typeName} typeName={typeName} />
          ))}
          <span aria-hidden="true" style={{ flex: "1 1 auto" }} />
          <Typography.Text strong>
            {pokemon?.base_experience ?? 0} XP
          </Typography.Text>
        </Flex>
      )}
      <Image
        wrapperClassName={wrapperClassName}
        className={styles["cover-image-img"]}
        preview={false}
        src={logoUrl}
        alt={
          pokemon?.name
            ? `Pokémon: ${capitalizeFirstLetter(pokemon.name)}`
            : "Pokémon image"
        }
        style={{
          height: "100%",
        }}
      />
      <Typography.Title
        level={size === "small" ? 5 : 3}
        aria-level={1}
        style={{ textAlign: "center", margin: 0 }}
      >
        {capitalizeFirstLetter(pokemon?.name)}
      </Typography.Title>
    </Flex>
  );
};
