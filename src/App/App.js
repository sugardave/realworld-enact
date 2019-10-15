import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {renderRoutes} from 'react-router-config';
import {useLocation} from 'react-router-dom';

// Local Components
import Footer from '../components/Footer';
import Header from '../components/Header';

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
	// eslint-disable-next-line enact/prop-types
	delete props.staticContext;
	const location = useLocation();
	const appProps = {...props, location};

	return <AppBase {...appProps} />;
};

export default App;
export {App};
