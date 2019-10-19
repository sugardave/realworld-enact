import {
	adaptEvent,
	forward,
	handle,
	log,
	preventDefault
} from '@enact/core/handle';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

// Local Components
import NavLink from '../components/NavLink';
import Panel from '../components/Panel/Panel';

// Utilities
import {Auth as AuthRequests} from '../utils/agent';
import {useAppContext} from '../utils/state';

const makeErrorList = ({errors = [], type}) => {
	const errorsArray = typeof errors === 'string' ? [errors] : [...errors];
	return errorsArray.map((error, index) => (
		<li key={`${type}-error-${index}`}>{`${type} ${error}`}</li>
	));
};

const handleSubmit = (
	ev,
	{email, match: {path}, username, password, setErrors, setToken, setUser}
) => {
	if (path === '/register') {
		if (!username || !password || !email) {
			// cannot register without all three things!
			return false;
		}
		// clear errors before a new auth request
		setErrors([]);
		AuthRequests.register({username, email, password})
			.then(({user}) => {
				const {token} = user;
				setUser(user);
				setToken(token);
			})
			.catch(({response: {body: {errors}}}) => setErrors(errors));
	} else {
		console.log('LOGIN');
	}
};

const submitHandler = handle(
	preventDefault,
	log('submitHandler'),
	handleSubmit
);

const AuthBase = kind({
	name: 'Auth',

	propTypes: {
		route: PropTypes.object
	},

	handlers: {
		onChangeEmail: adaptEvent(
			({target: {value}}) => value,
			forward('onChangeEmail')
		),
		onChangePassword: adaptEvent(
			({target: {value}}) => value,
			forward('onChangePassword')
		),
		onChangeUserName: adaptEvent(
			({target: {value}}) => value,
			forward('onChangeUserName')
		),
		onSubmit: submitHandler
	},

	computed: {
		errors: ({errors}) => {
			if (!errors) return;
			const orderedKeys = ['username', 'email', 'password'];

			return orderedKeys.map((k) => {
				return makeErrorList({
					type: k,
					errors: errors[k]
				});
			});
		},
		isRegistering: ({match: {isExact, path}}) =>
			path === '/register' && isExact,
		viewLabel: ({match: {path}}) =>
			path === '/register' ? 'Sign up' : 'Sign in'
	},

	render: ({
		errors,
		isRegistering,
		onChangeEmail,
		onChangePassword,
		onChangeUserName,
		onSubmit,
		viewLabel,
		...rest
	}) => {
		delete rest.setErrors;
		delete rest.setToken;
		delete rest.setUser;
		return (
			<Panel {...rest}>
				<div className="auth-page">
					<div className="container page">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-xs-12">
								<h1 className="text-xs-center">{viewLabel}</h1>
								{!isRegistering ? null : (
									<p className="text-xs-center">
										<NavLink to="/login">Have an account?</NavLink>
									</p>
								)}
								<ul className="error-messages">{errors}</ul>
								<form onSubmit={onSubmit}>
									{!isRegistering ? null : (
										<fieldset className="form-group">
											<input
												className="form-control form-control-lg"
												onChange={onChangeUserName}
												placeholder="Your Name"
												type="text"
											/>
										</fieldset>
									)}
									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											onChange={onChangeEmail}
											placeholder="Email"
											type="text"
										/>
									</fieldset>
									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											onChange={onChangePassword}
											placeholder="Password"
											type="password"
										/>
									</fieldset>
									<button className="btn btn-lg btn-primary pull-xs-right">
										{viewLabel}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Panel>
		);
	}
});

const Auth = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUserName] = useState('');
	const [errors, setErrors] = useState([]);
	const {
		auth: {setToken, setUser}
	} = useAppContext();

	const authProps = {
		...props,
		email,
		errors,
		onChangeEmail: setEmail,
		onChangePassword: setPassword,
		onChangeUserName: setUserName,
		password,
		setErrors,
		setToken,
		setUser,
		username
	};

	return <AuthBase {...authProps} />;
};

export default Auth;
export {Auth};
