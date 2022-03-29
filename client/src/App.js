// import { Fragment } from 'react';
import Routes from './routes/Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import './assets/sass/app.scss'

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
