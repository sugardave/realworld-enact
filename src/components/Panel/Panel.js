import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {renderRoutes} from 'react-router-config';
import {withRouter} from 'react-router-dom';

const Panel = kind({
	name: 'Panel',

	render: (props) => {
		return <div {...props} />;
	}
});

const RoutedPanel = withRouter(
	kind({
		name: 'RoutedPanel',

		propTypes: {
			route: PropTypes.object
		},

		computed: {
			children: ({children, route: {routes}}) =>
				routes ? renderRoutes(routes) : children
		},

		render: (props) => {
			// eslint-disable-next-line enact/prop-types
			delete props.staticContext;
			return <Panel {...props} />;
		}
	})
);

export default RoutedPanel;
export {Panel, RoutedPanel};
