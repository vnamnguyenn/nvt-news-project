import React, {Fragment, useState} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {Link} from 'react-router-dom';

const SignIn = () => {
	const [values, setValues] = useState({
		email: '',
		password: ''
	});

	const inputs = [
		{
			id: 1,
			name: 'email',
			placeholder: 'Email',
			errorMessage: 'Enter your email!',
			label: 'Email',
			required: true,
		},
		{
			id: 2,
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			errorMessage: 'Enter your password!',
			label: 'Password',
			required: true
		}
	];

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	};
	return (
		<Fragment>
			<Header />
			<section className="section section-header-offset">
				<div className="signin-container container">
					<form onSubmit={handleSubmit}>
						<h1 className="title">Sign in</h1>
						{inputs.map((input) => (
							<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
						))}
						<button className="btn btn-primary">Submit</button>
						<div className="signin-bottom">
							<a href="/recover_password" className="forgot">
								Forgot your password?
							</a>
							<span className="new">
								Don't have an account yet?
								<Link to="/signup">Sign up!</Link>
							</span>
						</div>
					</form>
				</div>
			</section>
			<Footer />
		</Fragment>
	);
};

export default SignIn;
