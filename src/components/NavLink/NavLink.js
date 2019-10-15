import kind from '@enact/core/kind';
import {NavLink as RRNavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const NavLink = kind({
	name: 'NavLink',

	styles: {
		className: 'nav-link'
	},

	propTypes: {
		/*
		 * in a <Group /> we can set the selected prop to `active` then
		 * use Enact styling magic to apply `className` via `computed` props
		 */
		active: PropTypes.bool,
		icon: PropTypes.string
	},

	computed: {
		className: ({active, styler}) => styler.append(active)
	},

	render: ({icon, children, ...rest}) => {
		return (
			<RRNavLink {...rest}>
				{icon ? <i className={icon} /> : null}
				{icon ? ' ' : ''}
				{children}
			</RRNavLink>
		);
	}
});

export default NavLink;
export {NavLink, RRNavLink as RouterNavLinkBase};
