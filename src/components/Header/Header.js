import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';

// Local Components
import NavItem from '../NavItem';
import NavLink from '../NavLink';

const navLinkProps = [
	{children: 'Home', to: '', exact: true},
	{children: 'New Post', to: '', icon: 'ion-compose'},
	{children: 'Settings', to: '', icon: 'ion-gear-a'},
	{children: 'Sign up', to: 'register'}
];

const navLinks = navLinkProps.map((link, index) => ({
	key: `header-nav-item-${index}`,
	...link
}));

const Header = kind({
	name: 'Header',

	render: () => {
		return (
			<nav className="navbar navbar-light">
				<div className="container">
					<NavLink className="navbar-brand" to="index.html">
						conduit
					</NavLink>
					<Repeater
						className="nav navbar-nav pull-xs-right"
						childComponent={NavItem}
						component="ul"
					>
						{navLinks}
					</Repeater>
				</div>
			</nav>
		);
	}
});

export default Header;
export {Header};
