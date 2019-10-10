import kind from '@enact/core/kind';
import React from 'react';

import HomePage from '../views/HomePage';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		return <HomePage {...props} />;
	}
});

export default App;
