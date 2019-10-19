import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {renderRoutes} from 'react-router-config';

// Local Components
import Footer from '../components/Footer';
import Header from '../components/Header';

import css from './App.module.less';

const App = kind({
	name: 'App',

	propTypes: {
		route: PropTypes.object
	},

	styles: {
		css,
		className: 'app'
	},

	render: ({route: {routes}, ...rest}) => {
		// eslint-disable-next-line enact/prop-types
		delete rest.staticContext;
		return (
			<div {...rest}>
				<Header />
				{renderRoutes(routes)}
				<Footer />
			</div>
		);
	}
});

export default App;
export {App};
