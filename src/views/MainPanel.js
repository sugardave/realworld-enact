import Heading from '@enact/ui/Heading';
import kind from '@enact/core/kind';
import React from 'react';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<div {...props}>
			<Heading>
				MainPanel
			</Heading>
		</div>
	)
});

export default MainPanel;
