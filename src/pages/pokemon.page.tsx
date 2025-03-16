import { useParams } from "@tanstack/react-router";
import { Affix, Col, Row, theme } from "antd";
import { NotFound } from "components/not-found";
import { PokeCard } from "features/poke-card";
import { TypesCard } from "features/types-card";
import { FC } from "react";
import { useFetchPokemon } from "hooks/pokemon.hook";

export const PokemonPage: FC = () => {
  const { name } = useParams({ from: "/pokemons/$name" });
  const { data: pokemon, isLoading } = useFetchPokemon(name);
  const {
    token: { padding, Layout: { headerHeight = 64 } = {} },
  } = theme.useToken();

  if (!pokemon && !isLoading) {
    return <NotFound title={`${name} does not exist :(`} subTitle="" />;
  }

  return (
    <Row
      gutter={[padding, padding]}
      role="region"
      aria-labelledby="pokemon-detail-title"
    >
      <Col xs={24} md={8}>
        <Affix offsetTop={Number(headerHeight)} aria-labelledby="pokemon-card">
          <PokeCard name={name} />
        </Affix>
      </Col>
      <Col xs={24} md={16}>
        <TypesCard types={pokemon?.types} />
      </Col>
    </Row>
  );
};
