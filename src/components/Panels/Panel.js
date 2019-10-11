import kind from '@enact/core/kind';
import React from 'react';

const Panel = kind({
	name: 'Panel',
	render: ({children, ...rest}) => {
		return <article {...rest}>{children}</article>;
	}
});

export default Panel;
export {Panel};
