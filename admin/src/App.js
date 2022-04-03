import ROUTES from './routes/routes';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => {
	return (
		<div>
			<Router>
				<ROUTES />
			</Router>
		</div>
	);
};

export default App;
