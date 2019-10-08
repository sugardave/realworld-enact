import BodyText from '@enact/ui/BodyText';
import kind from '@enact/core/kind';
import React from 'react';

const Footer = kind({
	name: 'Footer',
	render: ({children, ...rest}) => {
		return (
			<div {...rest}>
				<BodyText centered>{children}</BodyText>
			</div>
		);
	}
});

export default Footer;
export {Footer};
