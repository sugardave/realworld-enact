import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {renderRoutes} from 'react-router-config';

// Local Components
import {Auth, setToken} from '../utils/agent';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Utilities
import {useAppContext} from '../utils/state';

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

	render: ({route: {routes}, ...rest}) => {
		return (
			<div {...rest}>
				<Header />
				{renderRoutes(routes)}
				<Footer />
			</div>
		);
	}
});

const App = ({...props}) => {
	const {
		auth: {setStateToken, token},
		user
	} = useAppContext();
	// const {user} = useAppContext();
	// eslint-disable-next-line enact/prop-types
	delete props.staticContext;

	const appProps = {
		...props
	};

	useEffect(() => {
		if (token) {
			setToken(token);
			if (!Object.keys(user).length) {
				Auth.current().then((response) => {
					console.log('GOT THIS USER RESPONSE', response);
				});
			}
		}
	}, [token, user]);

	return <AppBase {...appProps} />;
};

export default App;
export {App};
