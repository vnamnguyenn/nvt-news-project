import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
function CommentForm({
	handleSubmit,
	submitLabel,
	hasCanleButton = false,
	initialText = '',
	handleCanle,
	logged = false,
}) {
	const location = useLocation();
	const previosPage = location.pathname;
	const [text, setText] = useState(initialText);
	const [submitButton, setSubmitButton] = useState(logged);
	const currentUser = useSelector((state) => state.user.currentUser);
	const navigate = useNavigate();

	const isTextareaDisabled = text.length === 0;
	const onSubmit = (event) => {
		event.preventDefault();
		handleSubmit(text);
		setText('');
	};

	const showSubmitButton = () => {
		console.log(location);
		if (!currentUser) {
			toast.error('Login required', {
				position: 'bottom-right',
				autoClose: 2500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
			});
			const confirm = window.confirm(`Login required`);
			if (confirm) {
				return navigate('/signin', {state: {previosPage: previosPage}});
			}
		} else {
			return setSubmitButton(true);
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<div className="box-area-input">
				<textarea
					onClick={showSubmitButton}
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Add comment"
				></textarea>
			</div>

			<div className="submmit-comment">
				{submitButton === true && (
					<>
						{hasCanleButton && (
							<button type="button" onClick={handleCanle} className="btn btn-cancle">
								cancle
							</button>
						)}

						<button disabled={isTextareaDisabled} className="btn btn-primary">
							{submitLabel}
						</button>
					</>
				)}
			</div>
		</form>
	);
}

export default CommentForm;
