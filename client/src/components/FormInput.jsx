import {useState} from 'react';

const FormInput = (props) => {
	const [focused, setFocused] = useState(false);
	const {label, errorMessage, onChange, id, ...inputProps} = props;

	const handleFocus = (e) => {
		setFocused(true);
	};

	return (
		<div className="auth-input">
			<label>{label}</label>
			<input
				id={id}
				className="form-input"
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={() => inputProps.name === 'confirmPassword' && setFocused(true)}
				focused={focused.toString()}
			/>
			<span>{errorMessage}</span>
		</div>
	);
};

export default FormInput;
