import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Toggle } from './components/toggle';

import './styles/global.css';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ConvexProvider client={convex}>
			<Toggle />
		</ConvexProvider>
		<footer>
			a <a href="https://www.learnwithjason.dev/">Learn With Jason</a> creation
			·{' '}
			<a href="https://github.com/learnwithjason/dashboard-convex-react">
				source code
			</a>
		</footer>
	</React.StrictMode>,
);
