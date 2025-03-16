import { Card, Col, Row, theme, Typography } from "antd";
import { TypeDamages } from "components/type-damages";
import { PokeList } from "features/poke-list";
import { TypeLogo } from "features/type-logo";
import { useFetchType } from "hooks/type.hook";
import { FC } from "react";

interface TypesCardItemProps {
  typeName: string;
}

export const TypesCardItem: FC<TypesCardItemProps> = ({ typeName }) => {
  const { data: typeData, isLoading, isFetched } = useFetchType(typeName);
  const {
    token: { padding },
  } = theme.useToken();

  if (!typeData && isFetched) {
    return <Typography.Text italic>No data available</Typography.Text>;
  }

  const sameTypePokemons =
    typeData?.pokemon?.slice(0, 20).map((item) => item.pokemon.name) ?? [];

  return (
    <Card loading={isLoading} title={<TypeLogo typeName={typeName} />}>
      <Row gutter={[padding, padding]} align="middle">
        <Col span={24}>
          <Row gutter={[padding, padding]}>
            <Col xs={24} lg={12}>
              <TypeDamages
                title="Strong Against"
                typeResource={typeData?.damage_relations.double_damage_to}
              />
            </Col>
            <Col xs={24} lg={12}>
              <TypeDamages
                title="Weak Against"
                typeResource={typeData?.damage_relations.double_damage_from}
              />
            </Col>
            <Col xs={24} lg={12}>
              <TypeDamages
                title="Resistant To"
                typeResource={typeData?.damage_relations.half_damage_from}
              />
            </Col>
            <Col xs={24} lg={12}>
              <TypeDamages
                title="No Effect From"
                typeResource={typeData?.damage_relations.no_damage_from}
              />
            </Col>
          </Row>
        </Col>
        {sameTypePokemons.length > 0 && (
          <Col span={24}>
            <Typography.Title level={5}>Same Type Pokémons</Typography.Title>
            <PokeList
              layout="horizontal"
              size="small"
              names={sameTypePokemons}
            />
          </Col>
        )}
      </Row>
    </Card>
  );
};
