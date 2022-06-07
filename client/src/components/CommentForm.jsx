import React, {useState} from 'react';

function CommentForm({
	handleSubmit,
	submitLabel,
	hasCanleButton = false,
	initialText = '',
	handleCanle,
}) {
	const [text, setText] = useState(initialText);
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
					placeholder="Add comment"
				></textarea>
			</div>
			<div className="submmit-comment">
				{hasCanleButton && (
					<button type="button" onClick={handleCanle} className="btn btn-cancle">
						cancle
					</button>
				)}

				<button disabled={isTextareaDisabled} className="btn btn-primary">
					{submitLabel}
				</button>
			</div>
		</form>
	);
}

export default CommentForm;
