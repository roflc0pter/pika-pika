import { Image } from "antd";
import { useFetchType } from "hooks/type.hook";
import { capitalizeFirstLetter } from "libs/utils";
import { FC } from "react";

interface TypeLogoProps {
  typeName: string;
}
export const TypeLogo: FC<TypeLogoProps> = ({ typeName }) => {
  const { data: type } = useFetchType(typeName);
  const iconUrl = type?.sprites?.["generation-vi"]?.["x-y"]?.["name_icon"];

  if (!iconUrl) {
    return <span>{capitalizeFirstLetter(typeName)}</span>;
  }

  return (
    <Image src={iconUrl} preview={false} alt={`Pokémon type: ${typeName}`} />
  );
};
