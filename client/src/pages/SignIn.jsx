import React, {Fragment, useContext, useRef, useState} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Context} from '../context/Context';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const {dispatch, isFetching} = useContext(Context);
	const [values, setValues] = useState({
		UserEmail: '',
		PasswordHash: '',
	});

	const inputs = [
		{
			id: 1,
			name: 'UserEmail',
			placeholder: 'Email',
			errorMessage: 'Enter your email!',
			label: 'Email',
			required: true,
		},
		{
			id: 2,
			name: 'PasswordHash',
			type: 'password',
			placeholder: 'Password',
			errorMessage: 'Enter your password!',
			label: 'Password',
			required: true,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({type: 'LOGIN_START'});
		try {
			const res = await axios.post('/signin', {
				UserEmail: emailRef.current.value,
				PasswordHash: passwordRef.current.value,
			});
			dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
		} catch (err) {
			dispatch({type: 'LOGIN_FAILURE'});
		}
	};

	const onChange = (e) => {
		setValues({...values, [e.target.name]: e.target.value});
	};
	console.log(isFetching);
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
