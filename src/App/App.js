import kind from '@enact/core/kind';
import React from 'react';
import {Route} from '@enact/ui/Routable';

// Local Components
import HomePage from '../views/HomePage';
import Panels from '../components/Panels';

import css from './App.module.less';

const App = kind({
	name: 'App',

	styles: {
		css,
		className: 'app'
	},

	render: (props) => {
		return (
			<Panels noCloseButton path="/#/" {...props}>
				<Route path="#" component={HomePage}>
					<Route path="article" />
					<Route path="editor" />
					<Route path="login" />
					<Route path="profile" />
					<Route path="register" />
					<Route path="settings" />
				</Route>
			</Panels>
		);
	}
});

export default App;
