import React from "react";
import { View, Dimensions } from "react-native";

import { trpc } from "@/utils/trpc";

// Utils
import { HORIZONTAL_PADDING, CHART_HEIGHT } from "@/utils/dashboard";

// Components
import LineChart from "@/components/charts/LineChart";
import { Card, AppText } from "@/components/general";

const ProgressDashboard = () => {
  return (
    <View>
      <AppText header>Progress</AppText>
      <Card>
        <ProgressChart />
      </Card>
    </View>
  );
};

const ProgressChart: React.FC = () => {
  const {
    isError,
    isLoading,
    data: chartData,
  } = trpc.progress.graph.useQuery();

  const { width: SCREEN_WIDTH } = Dimensions.get("screen");

  if (isLoading) return <AppText>Loading</AppText>;

  if (isError) return <AppText>Error</AppText>;

  if (chartData === undefined || chartData.length === 0)
    return <AppText>No data</AppText>;

  type ProgressChart = (typeof chartData)[0];

  return (
    <LineChart<ProgressChart>
      label="date"
      value="weight"
      data={chartData}
      height={CHART_HEIGHT}
      width={SCREEN_WIDTH - HORIZONTAL_PADDING * 2}
    />
  );
};

export default ProgressDashboard;
