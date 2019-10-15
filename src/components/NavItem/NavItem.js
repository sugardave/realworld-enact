import kind from '@enact/core/kind';
import React from 'react';

// Local Components
import NavLink from '../NavLink';

const NavItem = kind({
	name: 'NavItem',

	styles: {
		className: 'nav-item'
	},

	render: ({className, ...rest}) => {
		return (
			<li className={className}>
				<NavLink {...rest} />
			</li>
		);
	}
});

export default NavItem;
export {NavItem};
