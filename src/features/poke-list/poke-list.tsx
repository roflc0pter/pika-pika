import { Empty, Flex } from "antd";
import clsx from "clsx";
import { FC } from "react";
import { PokeListItem } from "./poke-list-item";
import styles from "./styles.module.css";

interface PokeListProps {
  names?: string[];
  layout?: "default" | "horizontal";
  size?: "middle" | "small";
}

export const PokeList: FC<PokeListProps> = ({
  names,
  layout = "default",
  size = "middle",
}) => {
  if (!names || !names.length) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="No Pokémon found"
      />
    );
  }

  const className = clsx({
    [styles["poke-list-horizontal"]]: layout === "horizontal",
  });

  return (
    <Flex
      wrap={layout === "default"}
      gap={size}
      justify={size === "middle" ? "center" : "flex-start"}
      className={className}
      role="list"
    >
      {names.map((name) => (
        <PokeListItem key={name} name={name} size={size} />
      ))}
    </Flex>
  );
};
