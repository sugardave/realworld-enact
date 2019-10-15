import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

// Local Components
import Panel from '../components/Panel/Panel';

const Auth = kind({
	name: 'Auth',

	propTypes: {
		route: PropTypes.object
	},

	computed: {
		isRegistering: ({route: {register}}) => !!register
	},

	render: ({isRegistering, ...rest}) => {
		return (
			<Panel {...rest}>
				<div className="auth-page">
					<div className="container page">
						<div className="row">
							<div className="col-md-6 offset-md-3 col-xs-12">
								<h1 className="text-xs-center">Sign up</h1>
								<p className="text-xs-center">
									<a href="">Have an account?</a>
								</p>

								<ul className="error-messages">
									<li>That email is already taken</li>
								</ul>
								<form>
									{!isRegistering ? null : (
										<fieldset className="form-group">
											<input
												className="form-control form-control-lg"
												type="text"
												placeholder="Your Name"
											/>
										</fieldset>
									)}
									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="text"
											placeholder="Email"
										/>
									</fieldset>
									<fieldset className="form-group">
										<input
											className="form-control form-control-lg"
											type="password"
											placeholder="Password"
										/>
									</fieldset>
									<button className="btn btn-lg btn-primary pull-xs-right">
										Sign up
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

export default Auth;
export {Auth};
