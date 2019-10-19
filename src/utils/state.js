import React, {useContext, useState} from 'react';

export const AppContext = React.createContext(null);

export const useAppContext = () => {
	return useContext(AppContext);
};

// eslint-disable-next-line enact/display-name
export default ({children}) => {
	const [token, setStateToken] = useState();
	const [user, setStateUser] = useState({});

	const initialValue = {
		auth: {
			token,
			setStateToken,
			setStateUser
		},
		user
	};
	return (
		<AppContext.Provider value={initialValue}>{children}</AppContext.Provider>
	);
};
