import BodyText from '@enact/ui/BodyText';
import Heading from '@enact/ui/Heading';
import kind from '@enact/core/kind';
import React from 'react';

const Header = kind({
	name: 'Header',

	render: ({children, ...rest}) => {
		return (
			<Heading {...rest}>
				<BodyText centered>{children}</BodyText>
			</Heading>
		);
	}
});

export default Header;
export {Header};
