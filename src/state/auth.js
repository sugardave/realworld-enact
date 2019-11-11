import curry from 'ramda/src/curry';

// Generic state getters/setters

const getState = curry((name, state) => state.auth[name]);
const setState = curry((name, value, state) => {
	state.auth[name] = value;
});

// Specialized state retrieval functions

const getToken = getState('token');
const getUser = getState('user');

// Specialized state update functions

const setToken = setState('token');
const setUser = setState('user');

export {getToken, getUser, setToken, setUser};
