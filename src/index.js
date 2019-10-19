import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

import AppContextProvider from './utils/state';
import routes from './routeConfig';

const appElement = (
	<AppContextProvider>
		<Router>{renderRoutes(routes)}</Router>
	</AppContextProvider>
);

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
