import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import {Routable} from '@enact/ui/Routable';
import ViewManager from '@enact/ui/ViewManager';

const PanelsBase = kind({
	name: 'Panels',

	propTypes: {
		index: PropTypes.number,
		onNavigate: PropTypes.func
	},
	defaultProps: {
		index: 0
	},

	render: ({children, index, ...rest}) => {
		delete rest.onNavigate;
		return (
			<ViewManager duration={250} index={index}>
				{children}
			</ViewManager>
		);
	}
});

const Panels = Routable({navigate: 'onNavigate'}, PanelsBase);

export default Panels;
export {Panels, PanelsBase};
