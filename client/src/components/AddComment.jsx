import React, {useState} from 'react';

function AddComment({handleSubmit, submitLabel}) {
	const [text, setText] = useState('');
	const isTextareaDisabled = text.length === 0;
	const onSubmit = (event) => {
		event.preventDefault();
		handleSubmit(text);
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="box-area-input">
				<textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Please coment at the mo"
				></textarea>
			</div>
			<div className="submmit-comment">
				<button disabled={isTextareaDisabled} className="btn btn-primary">
					{submitLabel}
				</button>
			</div>
		</form>
	);
}

export default AddComment;
