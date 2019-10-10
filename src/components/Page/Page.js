import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Footer from '../Footer';
import Header from '../Header';

const Page = kind({
	name: 'Page',

	propTypes: {
		noFooter: PropTypes.bool,
		noHeader: PropTypes.bool
	},

	defaultProps: {
		noFooter: false,
		noHeader: false
	},

	render: ({children, noFooter, noHeader, ...rest}) => {
		return (
			<div {...rest}>
				{noHeader ? null : (
					// prettier-ignore
					<Header />
				)}
				<article>{children}</article>
				{noFooter ? null : (
					// prettier-ignore
					<Footer />
				)}
			</div>
		);
	}
});

export default Page;
export {Page};
