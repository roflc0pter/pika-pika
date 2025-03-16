import { Flex, Typography } from "antd";
import { TypeLogo } from "features/type-logo";
import { FC } from "react";
import { INamedAPIResource } from "types/named-api-resource.type";

interface TypeDamagesProps {
  title: string;
  typeResource?: INamedAPIResource[];
}

export const TypeDamages: FC<TypeDamagesProps> = ({ title, typeResource }) => {
  return (
    <div>
      <Typography.Title level={5} style={{ marginBottom: 2 }}>
        {title}
      </Typography.Title>
      {typeResource?.length ? (
        <Flex wrap gap="small" role="list">
          {typeResource.map(({ name }) => (
            <span key={name} role="listitem">
              <TypeLogo typeName={name} />
            </span>
          ))}
        </Flex>
      ) : (
        <Typography.Text italic>No data available</Typography.Text>
      )}
    </div>
  );
};
