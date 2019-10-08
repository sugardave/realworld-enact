import kind from '@enact/core/kind';
import React from 'react';

import MainPanel from '../views/MainPanel';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => <MainPanel {...props} />
});

export default App;
