import React, {useContext, useEffect, useState} from 'react';
import {setToken as setAuthToken} from './agent';

export const AppContext = React.createContext(null);

export const useAppContext = () => {
	return useContext(AppContext);
};

// eslint-disable-next-line enact/display-name
export default ({children}) => {
	const [token, setToken] = useState();
	const [user, setUser] = useState({});

	const initialValue = {
		auth: {
			setToken,
			setUser,
			token
		},
		user
	};

	useEffect(() => {
		// use the new token for all API requests
		setAuthToken(token);
	}, [token]);

	return (
		<AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
	);
};
