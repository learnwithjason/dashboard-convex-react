import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toggle } from './components/toggle';

import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Toggle />
		<footer>
			a <a href="https://www.learnwithjason.dev/">Learn With Jason</a> creation
			·{' '}
			<a href="https://github.com/learnwithjason/dashboard-convex-react">
				source code
			</a>
		</footer>
	</React.StrictMode>,
);
