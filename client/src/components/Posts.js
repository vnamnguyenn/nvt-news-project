import React from "react";
import Button from "@atlaskit/button";
import styled, {css} from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
const ButtonStyled = styled(Button)`
	margin-top: 5px;
	text-align: left;
	${(p) =>
		p.isCompleted &&
		css`
			text-decoration: line-through;
		`}
	&:hover {
		.check-icon {
			display: inline-block;
		}
	}
	.check-icon {
		display: none;
		&:hover {
			background-color: #e2e2e2;
			border-radius: 3px;
		}
	}
`;
export default function Post({post, onCheckBtnClick}) {
	return (
		<ButtonStyled
			isCompleted={post.isCompleted}
			shouldFitContainer
			iconAfter={
				<span className="check-icon" onClick={() => onCheckBtnClick(post.id)}>
					<CheckIcon primaryColor="#4fff4f"></CheckIcon>
				</span>
			}
		>
			{post.name}
		</ButtonStyled>
	);
}
