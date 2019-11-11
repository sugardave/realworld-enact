import {getToken, getUser, setToken, setUser} from '../state/auth';
import {Auth, setToken as setAuthToken} from '../utils/agent';

const getAuthorizationToken = getToken;

const getLoggedInUser = getUser;

const setAuthorizationToken = setToken;

const setLoggedInUser = setUser;

const registerUser = ({
	onError,
	onSuccess,
	user: {email, password, username}
}) => {
	if (!email || !password || !username) {
		// cannot register without all three things!
		return false;
	}
	return Auth.register({email, username, password})
		.then(({user}) => {
			// set token for all future requests
			setAuthToken(user.token);
			if (onSuccess) {
				onSuccess({user});
			}
		})
		.catch(({response: {body: {errors}}}) => {
			if (onError) {
				onError(errors);
			}
		});
};

export {
	getAuthorizationToken,
	getLoggedInUser,
	registerUser,
	setAuthorizationToken,
	setLoggedInUser
};
