import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import React from 'react';
import { useMemo } from 'react';
import { Chart } from 'react-charts';

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

	const reactions = useQuery(api.reactions.getByPup);

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
