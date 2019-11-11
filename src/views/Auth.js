import {
	adaptEvent,
	forward,
	handle,
	log,
	preventDefault
} from '@enact/core/handle';
import compose from 'ramda/src/compose';
import ConsumerDecorator from '@enact/agate/data/ConsumerDecorator';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

// Local Components
import NavLink from '../components/NavLink';
import Panel from '../components/Panel/Panel';

// Stateful bits
import {
	getAuthorizationToken,
	registerUser,
	setAuthorizationToken,
	setLoggedInUser
} from '../adapters/auth';

// Utilities
// import {Auth as AuthRequests, setToken} from '../utils/agent';

const makeErrorList = ({errors = [], type}) => {
	const errorsArray = typeof errors === 'string' ? [errors] : [...errors];
	return errorsArray.map((error, index) => (
		<li key={`${type}-error-${index}`}>{`${type} ${error}`}</li>
	));
};

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
		)
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

const AuthDecorator = compose(
	// eslint-disable-next-line enact/display-name
	(Wrapped) => (props) => {
		// hook-tastic!
		const [email, setEmail] = useState('');
		const [password, setPassword] = useState('');
		const [username, setStateUserName] = useState('');
		const [errors, setErrors] = useState([]);

		const authProps = {
			...props,
			email,
			errors,
			onChangeEmail: setEmail,
			onChangePassword: setPassword,
			onChangeUserName: setStateUserName,
			password,
			setErrors,
			username
		};

		return <Wrapped {...authProps} />;
	},
	ConsumerDecorator({
		handlers: {
			onSubmit: (
				ev,
				{email, history, match: {path}, username, password, setErrors},
				{update}
			) => {
				// clear errors before making a new auth request
				setErrors(null);
				if (path === '/register') {
					preventDefault(ev);
					registerUser({
						onError: setErrors,
						onSuccess: ({user: {token, ...user}}) => {
							// store token in app state in case we need it (probably don't need it)
							update(setAuthorizationToken(token));
							// store logged in user
							update(setLoggedInUser(user));
							history.push('/');
						},
						user: {email, password, username}
					});
				} else {
					console.log('LOGIN');
				}
			}
		}
		// mapStateToProps: {
		// 	authToken: getAuthorizationToken
		// }
	})
);

const Auth = AuthDecorator(AuthBase);

export default Auth;
export {Auth};
