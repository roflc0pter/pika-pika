import { Col, Flex, Progress, Row, Typography } from "antd";
import { FC } from "react";
import { IPokemon } from "types/pokemon.type";

const MAX_STAT_VALUE = 170;

const STACK_MAP: Record<string, { color: string; label: string }> = {
  hp: { color: "green", label: "HP" },
  attack: { color: "red", label: "ATK" },
  defense: { color: "blue", label: "DEF" },
  speed: { color: "purple", label: "SPD" },
};

interface PokeStatsProps {
  stats?: IPokemon["stats"];
}

export const PokeStats: FC<PokeStatsProps> = ({ stats }) => {
  const filteredStats =
    stats?.filter(({ stat }) => stat.name in STACK_MAP) ?? [];

  if (filteredStats.length === 0) {
    return <Typography.Text italic>No stats available</Typography.Text>;
  }

  return (
    <Row gutter={[8, 8]}>
      {filteredStats.map(({ base_stat, stat }) => {
        const mappedStat = STACK_MAP[stat.name];

        return (
          <Col span={24} key={stat.name}>
            <Row align="middle">
              <Col span={4}>
                <Typography.Text strong>{mappedStat.label}:</Typography.Text>
              </Col>
              <Col span={20}>
                <Flex gap="small">
                  <Progress
                    aria-label={`${mappedStat.label}: ${base_stat}`}
                    percentPosition={{ align: "center", type: "inner" }}
                    percent={(base_stat / MAX_STAT_VALUE) * 100}
                    strokeColor={mappedStat.color}
                    format={() => base_stat}
                    size={{ height: 20 }}
                  />
                </Flex>
              </Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};
