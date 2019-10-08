import kind from '@enact/core/kind';
import React from 'react';

import Page from '../components/Page';

const MainPage = kind({
	name: 'MainPage',

	render: (props) => (
		<Page {...props} title="MainPage">
			This is the main page
		</Page>
	)
});

export default MainPage;
