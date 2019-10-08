import kind from '@enact/core/kind';
import React from 'react';

import MainPage from '../views/MainPage';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		return <MainPage {...props} />;
	}
});

export default App;
