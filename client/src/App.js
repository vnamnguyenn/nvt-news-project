import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import ListPost from "./components/ListPost";
import {useCallback, useState} from "react";
import {v4} from "uuid";
function App() {
	const [listPost, setListPost] = useState([]);
	const [textInput, setTextInput] = useState("");
	const onTextInputChange = useCallback((e) => {
		setTextInput(e.target.value);
	}, []);
	const onAddBtnClick = useCallback(
		(e) => {
			setListPost([{id: v4(), name: textInput, isCompleted: false}, ...listPost]);
			setTextInput("");
		},
		[textInput, listPost],
	);
	const onCheckBtnClick = useCallback((id) => {
		setListPost((prevState) => prevState.map((post) => post.id === id ? {...post, isCompleted: true} : post));
	}, []);
	return (
		<>
			<h3>Danh sách post</h3>
			<Textfield
				name="create-post"
				placeholder="Thêm bài viết mới"
				elemAfterInput={
					<Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>
						Thêm
					</Button>
				}
				css={{padding: "2px 4px 2px"}}
				value={textInput}
				onChange={onTextInputChange}
			></Textfield>
			<ListPost listPost={listPost} onCheckBtnClick={onCheckBtnClick}/>
		</>
	);
}

export default App;
