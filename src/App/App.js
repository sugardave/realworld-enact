/* eslint-disable enact/prop-types */
import compose from 'ramda/src/compose';
import ConsumerDecorator from '@enact/agate/data/ConsumerDecorator';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import ProviderDecorator from '@enact/agate/data/ProviderDecorator';
import React from 'react';
import {renderRoutes} from 'react-router-config';

// Local Components
import Footer from '../components/Footer';
import Header from '../components/Header';

// Stateful bits
import {getAuthorizationToken, getLoggedInUser} from '../adapters/auth';
import initialState from './initialState';

import css from './App.module.less';

const AppBase = kind({
	name: 'App',

	propTypes: {
		route: PropTypes.object
	},

	styles: {
		css,
		className: 'app'
	},

	render: ({authToken, route, user, ...rest}) => {
		delete rest.authToken;
		delete rest.staticContext;
		delete rest.user;

		return (
			<div {...rest}>
				<Header />
				{renderRoutes(route.routes)}
				<Footer />
			</div>
		);
	}
});

const AppDecorator = compose(
	ProviderDecorator({
		state: initialState()
	}),
	ConsumerDecorator({
		mapStateToProps: {
			authToken: getAuthorizationToken,
			user: getLoggedInUser
		}
	})
);

const App = AppDecorator(AppBase);

export default App;
export {App};
