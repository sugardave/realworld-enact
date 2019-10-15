import kind from '@enact/core/kind';
import {NavLink} from 'react-router-dom';
import React from 'react';

const Footer = kind({
	name: 'Footer',

	render: () => {
		return (
			<footer>
				<div className="container">
					<NavLink className="logo-font" to="/">
						conduit
					</NavLink>
					<span className="attribution">
						An interactive learning project from{' '}
						<a href="https://thinkster.io">Thinkster</a>. Code &amp; design
						licensed under MIT.
					</span>
				</div>
			</footer>
		);
	}
});

export default Footer;
export {Footer};
