import { Divider, Flex, Spin } from "antd";
import { PokeList } from "features/poke-list/poke-list";
import { useFetchInfinitePokemons } from "hooks/pokemon.hook";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const PokemonsPage: FC = () => {
  const {
    data: pokeList,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useFetchInfinitePokemons({ limit: 80, offset: 0 });

  if (isLoading) {
    return (
      <Flex aria-label="Loading" justify="center">
        <Spin />
      </Flex>
    );
  }

  const pokemonNames =
    pokeList?.pages.flatMap((page) => page.results.map((p) => p.name)) || [];

  return (
    <InfiniteScroll
      dataLength={pokemonNames.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Flex justify="center">Loading...</Flex>}
      endMessage={<Divider plain>It is all, nothing more</Divider>}
      scrollableTarget="scrollableDiv"
      scrollThreshold={0.95}
    >
      <PokeList names={pokemonNames} />
    </InfiniteScroll>
  );
};
