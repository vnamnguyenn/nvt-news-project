import React from 'react';
import Routes from './routes/routes';
import {BrowserRouter as Router} from 'react-router-dom';
const App = () => {
	return (
		<div>
			<Router>
				<Routes />
			</Router>
		</div>
	);
};

export default App;
