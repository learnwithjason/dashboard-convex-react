import { useState } from 'react';
import { List } from './list';
import { BarChart } from './bar-chart';

export function Toggle() {
	const [state, setState] = useState<'main' | 'stats'>('main');
	const nextState = state === 'main' ? 'stats' : 'main';

	return (
		<div className="main">
			<button onClick={() => setState(nextState)} className="toggle">
				switch to {nextState} view
			</button>

			{state === 'main' ? (
				<>
					<h1>click an emoji to react to these pups</h1>
					<List />
				</>
			) : (
				<>
					<h1>reaction stats for pups</h1>
					<BarChart />
				</>
			)}
		</div>
	);
}
