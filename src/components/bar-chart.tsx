import React from 'react';
import { useMemo } from 'react';
import { Chart } from 'react-charts';
import { useQuery } from '../../convex/_generated/react';

interface DataPoint {
  name: string;
  count: number;
}

interface DataSeries {
  label: string;
  data: DataPoint[];
}

export const reactionTypes = [
  { name: 'heart', label: '💜' },
  { name: 'cute', label: '🥺' },
  { name: 'star_eyes', label: '🤩' },
];

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

  const reactions = useQuery('reactions:get');

  const data = useMemo(() => {
    if (!reactions) {
      return false;
    }

    return reactionTypes.reduce<DataSeries[]>((acc, { name, label }) => {
      return [
        ...acc,
        {
          label,
          data: reactions
            .filter((r) => r.type === name)
            .reduce<DataPoint[]>((acc2, r) => {
              const index = acc2.findIndex((d) => d.name === r.name);

              if (index >= 0) {
                acc2[index].count += 1;
              } else if (r.name) {
                acc2.push({
                  name: r.name,
                  count: 1,
                });
              }

              return acc2;
            }, []),
        },
      ];
    }, []);
  }, [reactions]);

  if (!data) {
    return null;
  }

  return (
    <div className="chart-container">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          interactionMode: 'primary',
          getSeriesStyle: (series) => {
            return {
              color: `url(#${series.index % 3})`,
            };
          },
          renderSVG: () => (
            <defs>
              <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="hsl(320deg 59% 59% / 0.7)" />
                <stop offset="100%" stopColor="hsl(320deg 59% 59% / 1)" />
              </linearGradient>
              <linearGradient id="1" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="hsl(50deg 100% 61% / 0.7)" />
                <stop offset="100%" stopColor="hsl(50deg 100% 61% / 1)" />
              </linearGradient>
              <linearGradient id="2" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="hsl(177deg 100% 82% / 0.7)" />
                <stop offset="100%" stopColor="hsl(177deg 100% 82% / 1)" />
              </linearGradient>
            </defs>
          ),
        }}
      />
    </div>
  );
}
