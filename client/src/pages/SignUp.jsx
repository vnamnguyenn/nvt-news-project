import React, {Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {signup} from '../redux/apiCalls';
const SignUp = () => {
	const [error, setError] = useState(false);
	const currentUser = useSelector((state) => state.user.currentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const [values, setValues] = useState({
		FullName: '',
		UserEmail: '',
		DateOfBirth: '',
		PasswordHash: '',
		ConfirmPassword: '',
		Gender: 'male',
	});

	useEffect(() => {
		document.title = 'Sign up';
		if (currentUser) {
			return navigate('/');
		}
	}, [navigate, currentUser]);

	const inputs = [
		{
			id: 1,
			name: 'FullName',
			type: 'text',
			placeholder: 'Fullname',
			errorMessage: 'Enter your name!',
			label: 'Fullname',
			required: true,
		},
		{
			id: 2,
			name: 'UserEmail',
			type: 'email',
			placeholder: 'Email',
			errorMessage: 'It should be a valid email address!',
			label: 'Email',
			required: true,
		},
		{
			id: 3,
			name: 'DateOfBirth',
			type: 'date',
			placeholder: 'Birthday',
			label: 'Birthday',
		},
		{
			id: 4,
			name: 'PasswordHash',
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
			name: 'ConfirmPassword',
			type: 'password',
			placeholder: 'Confirm Password',
			errorMessage: "Passwords don't match!",
			label: 'Confirm Password',
			pattern: values.PasswordHash,
			required: true,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			signup(
				dispatch,
				{
					FullName: values.FullName,
					UserEmail: values.UserEmail,
					DateOfBirth: values.DateOfBirth,
					PasswordHash: values.PasswordHash,
					Gender: values.Gender,
				},
				location.state.previosPage,
			);
		} catch (err) {
			setError(true);
		}
	};

	const onChange = (e) => {
		console.log(e.target.value);
		const {name, value} = e.target;
		setValues({...values, [name]: value});
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
						<div className="auth-input">
							<label>Gender</label>
							<select
								className="form-input"
								id="6"
								name="Gender"
								style={{fontSize: 'inherit'}}
								onChange={onChange}
							>
								<option value="male" selected>
									Male
								</option>
								<option value="female">FeMale</option>
							</select>
						</div>
						<button className="btn btn-primary">Submit</button>
						{error && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>}
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
