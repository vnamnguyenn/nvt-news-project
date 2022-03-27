import React, {Fragment} from "react";
import Navigation from "./Pages/Navigation";
import ROUTES from "./Routes/Routes";

const App = () => {
	return (
		<Fragment>
			<Navigation />
			<ROUTES />
		</Fragment>
	);
};

export default App;
