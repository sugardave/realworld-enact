import kind from '@enact/core/kind';
import React from 'react';
import Repeater from '@enact/ui/Repeater';
import {withRouter} from 'react-router-dom';

// Local Components
import NavItem from '../NavItem';
import NavLink from '../NavLink';

// Utilities
import {useAppContext} from '../../utils/state';

const homeLinks = [{children: 'Home', to: '/', exact: true}],
	publicLinks = [
		{children: 'Sign in', to: 'login'},
		{children: 'Sign up', to: 'register'}
	],
	privateLinks = [
		{
			children: 'New Post',
			to: '',
			icon: 'ion-compose'
		},
		{
			children: 'Settings',
			to: '',
			icon: 'ion-gear-a'
		},
		{
			children: '@username',
			to: 'profile'
		}
	];

const HeaderBase = kind({
	name: 'Header',

	computed: {
		// eslint-disable-next-line enact/prop-types
		navLinks: ({user}) => {
			const links = homeLinks.concat(
				user && Object.keys(user).length ? privateLinks : publicLinks
			);
			return links.flat().map((link, index) => {
				return Object.assign({...link}, {key: `header-nav-item-${index}`});
			});
		}
	},

	render: ({navLinks}) => {
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


const Header = withRouter((props) => {
	const {user} = useAppContext();
	const headerProps = {
		...props,
		user
	};
	return <HeaderBase {...headerProps} />;
});

export default Header;
export {Header};
