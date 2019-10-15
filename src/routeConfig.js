import React from 'react';
import {Redirect} from 'react-router-dom';

// views for routes
import App from './App/App';
import Auth from './views/Auth';
import Home from './views/Home';

const routes = [
	{
		component: App,
		routes: [
			{
				path: '/',
				exact: true,
				component: Home
			},
			{
				path: '/index.html',
				// eslint-disable-next-line enact/display-name
				component: () => <Redirect to="/" /> // see https://github.com/ReactTraining/react-router/issues/5138
			},
			{
				path: '/login',
				component: Auth
			},
			{
				path: '/register',
				component: Auth,
				register: true
			}
		]
	}
];

export default routes;
export {routes};
