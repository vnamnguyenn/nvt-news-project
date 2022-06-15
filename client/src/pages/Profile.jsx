import React, {Fragment, useState, useEffect} from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FormInput from '../components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {updateProfile} from '../redux/apiCalls';
import {baseImageUrl, publicRequest} from '../requestMethods';
const Profile = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	const navigate = useNavigate();
	const [error, setError] = useState(false);
	const [file, setFile] = useState(null);

	const obj = {
		FullName: currentUser ? currentUser.exportData.FullName : currentUser,
		UserEmail: currentUser ? currentUser.exportData.UserEmail : currentUser,
		Avatar: currentUser ? currentUser.exportData.Avatar : currentUser,
	};

	const [values, setValues] = useState(obj);

	useEffect(() => {
		document.title = 'Update Profile';
		if (!currentUser) {
			return navigate('/');
		}
	}, [currentUser, navigate]);

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
				document.getElementById('file').value = null;
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
				{file ? (
					<div className="container image-profile">
						<img src={URL.createObjectURL(file)} alt="" />
					</div>
				) : (
					<div className="container image-profile">
						<img src={`${baseImageUrl}${values.Avatar}`} alt="" />
					</div>
				)}

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
								id="file"
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
