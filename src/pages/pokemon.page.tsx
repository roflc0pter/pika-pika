import { useParams } from "@tanstack/react-router";
import { Affix, Col, Grid, Row, theme } from "antd";
import { NotFound } from "components/not-found";
import { PokeCard } from "features/poke-card";
import { TypesCard } from "features/types-card";
import { FC } from "react";
import { useFetchPokemon } from "hooks/pokemon.hook";

export const PokemonPage: FC = () => {
  const { name } = useParams({ from: "/pokemons/$name" });
  const { data: pokemon, isLoading } = useFetchPokemon(name);
  const {
    token: { padding, paddingXL, Layout: { headerHeight = 64 } = {} },
  } = theme.useToken();
  const screens = Grid.useBreakpoint();

  if (!pokemon && !isLoading) {
    return <NotFound title={`${name} does not exist :(`} subTitle="" />;
  }

  const pokeCard = screens.md ? (
    <Affix offsetTop={Number(headerHeight)} aria-labelledby="pokemon-card">
      <PokeCard name={name} />
    </Affix>
  ) : (
    <PokeCard name={name} />
  );

  return (
    <Row
      gutter={[padding, padding + paddingXL]}
      role="region"
      aria-labelledby="pokemon-detail-title"
    >
      <Col xs={24} sm={12} lg={8}>
        {pokeCard}
      </Col>
      <Col xs={24} sm={12} lg={16}>
        <TypesCard types={pokemon?.types} />
      </Col>
    </Row>
  );
};
