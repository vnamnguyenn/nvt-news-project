import React, {Fragment, useState} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {Link} from 'react-router-dom';

const SignUp = () => {
	const [values, setValues] = useState({
		fullName: '',
		email: '',
		birthday: '',
		password: '',
		confirmPassword: '',
	});

	const inputs = [
		{
			id: 1,
			name: 'fullName',
			type: 'text',
			placeholder: 'Fullname',
			errorMessage: 'Enter your name!',
			label: 'Fullname',
			required: true,
		},
		{
			id: 2,
			name: 'email',
			type: 'email',
			placeholder: 'Email',
			errorMessage: 'It should be a valid email address!',
			label: 'Email',
			required: true,
		},
		{
			id: 3,
			name: 'birthday',
			type: 'date',
			placeholder: 'Birthday',
			label: 'Birthday',
		},
		{
			id: 4,
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			errorMessage:
				'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
			label: 'Password',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			required: true,
		},
		{
			id: 5,
			name: 'confirmPassword',
			type: 'password',
			placeholder: 'Confirm Password',
			errorMessage: "Passwords don't match!",
			label: 'Confirm Password',
			pattern: values.password,
			required: true,
		},
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
						<h1 className="title">Sign up</h1>
						{inputs.map((input) => (
							<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
						))}
						<button className="btn btn-primary">Submit</button>
						<div className="signin-bottom">
							<span className="new">
								Already an account?
								<Link to="/signin">Sign in!</Link>
							</span>
						</div>
					</form>
				</div>
			</section>
			<Footer />
		</Fragment>
	);
};

export default SignUp;
