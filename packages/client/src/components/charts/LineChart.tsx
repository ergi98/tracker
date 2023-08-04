import React, { useContext } from "react";
import {
  vec,
  Path,
  Group,
  Canvas,
  LinearGradient,
} from "@shopify/react-native-skia";

// Helpers
import { LineGraph } from "@/classes";

// Context
import { ThemeContext } from "@/context/theme";

type LineChartProps<T> = {
  data: T[];
  value: keyof T;
  label: keyof T;
  width: number;
  height: number;
  pointGap?: number;
  margins?: [number, number, number, number];
};

const LineChart = <T extends object>({
  data,
  value,
  label,
  width,
  height,
  margins,
  pointGap,
}: LineChartProps<T>) => {
  const graph = new LineGraph(
    data,
    width,
    height,
    label,
    value,
    pointGap,
    margins
  );

  const theme = useContext(ThemeContext);

  return (
    <Canvas style={{ flex: 1, width, height }}>
      <Group>
        {/* yAxis */}
        <Path
          style="stroke"
          strokeWidth={1}
          strokeCap="round"
          strokeJoin="round"
          path={graph.yAxis}
          color={`${theme.colors.stone[50]}30`}
        />
        {/* xAxis */}
        <Path
          style="stroke"
          strokeWidth={1}
          strokeCap="round"
          strokeJoin="round"
          path={graph.xAxis}
          color={`${theme.colors.stone[50]}30`}
        />
        <Path
          style="stroke"
          strokeWidth={4}
          strokeCap="round"
          strokeJoin="round"
          path={graph.path}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, height)}
            colors={[theme.colors.indigo[500], theme.colors.indigo[950]]}
          />
        </Path>
      </Group>
    </Canvas>
  );
};

export default LineChart;
