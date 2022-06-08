import React, {Fragment, useState, useEffect} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../redux/apiCalls';
import {publicRequest} from '../requestMethods';
const Profile = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const [error, setError] = useState(false);
	const [file, setFile] = useState(null);
	const obj = {
		FullName: currentUser.exportData.FullName,
		UserEmail: currentUser.exportData.UserEmail,
		Avatar: '',
	};

	const [values, setValues] = useState(obj);

	useEffect(() => {
		document.title = 'Update Profile';
	}, []);

	const inputs = [
		{
			id: 'FullName',
			name: 'FullName',
			type: 'text',
			placeholder: 'Fullname',
			errorMessage: 'Enter your name!',
			label: 'Fullname',
			required: true,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			values.Avatar = filename;
			console.log(values);
			try {
				await publicRequest.post('/upload', data);
			} catch (err) {}
		}
		try {
			updateProfile(dispatch, {
				FullName: values.FullName,
				Avatar: values.Avatar,
			});
		} catch (err) {
			setError(true);
		}
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
						<h1 className="title">Update Profile</h1>
						<div className="auth-input">
							<label>UserEmail</label>
							<input className="form-input" type="text" disabled value={values.UserEmail} />
						</div>
						{inputs.map((input) => (
							<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
						))}
						<div className="auth-input">
							<label>Avatar</label>
							<input
								className="form-input"
								accept="image/png, image/gif, image/jpeg"
								type="file"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</div>
						<button className="btn btn-primary">Update</button>
						{error && <span style={{color: 'red', marginTop: '10px'}}>Something went wrong!</span>}
					</form>
				</div>
			</section>
			<Footer />
		</Fragment>
	);
};

export default Profile;
