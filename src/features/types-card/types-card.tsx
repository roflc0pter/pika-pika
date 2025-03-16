import { Flex, Typography } from "antd";
import { FC } from "react";
import { IPokemon } from "types/pokemon.type";
import { TypesCardItem } from "./types-card-item";

interface TypesCardProps {
  types?: IPokemon["types"];
}

export const TypesCard: FC<TypesCardProps> = ({ types }) => {
  if (!types?.length) {
    return <Typography.Text italic>No types available</Typography.Text>;
  }

  return (
    <section aria-labelledby="poke-types">
      <Typography.Title id="poke-types" level={3}>
        Pokemon Types
      </Typography.Title>
      <Flex vertical gap={"middle"} role="list">
        {types.map((type) => (
          <div role="listitem" key={type.type.name}>
            <TypesCardItem typeName={type.type.name} />
          </div>
        ))}
      </Flex>
    </section>
  );
};
