import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';

import routes from './routeConfig';

const appElement = <Router>{renderRoutes(routes)}</Router>;

// In a browser environment, render instead of exporting
if (typeof window !== 'undefined') {
	render(appElement, document.getElementById('root'));
}

export default appElement;
