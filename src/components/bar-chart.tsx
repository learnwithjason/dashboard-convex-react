import React from 'react';
import { useMemo } from 'react';
import { Chart } from 'react-charts';
import { useQuery } from '../../convex/_generated/react';

interface DataPoint {
  name: string;
  count: number;
}

export function BarChart() {
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: DataPoint) => datum.name,
      showGrid: false,
      innerBandPadding: 0.3,
      innerSeriesBandPadding: 0.05,
    }),
    [],
  );

  const secondaryAxes = useMemo(() => {
    return [
      {
        getValue: (d: DataPoint) => d.count,
        hardMin: 0,
        showGrid: false,
      },
    ];
  }, []);

  const reactions = useQuery('reactions:getByPup');

  if (!reactions) {
    return null;
  }

  return (
    <div className="chart-container">
      <Chart
        options={{
          data: reactions,
          primaryAxis,
          secondaryAxes,
          interactionMode: 'primary',
        }}
      />
    </div>
  );
}
