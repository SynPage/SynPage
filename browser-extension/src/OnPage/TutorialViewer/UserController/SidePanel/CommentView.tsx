import {DialogContent} from "@mui/material";
import {Tutorial} from "../../../../client/generated";
import {useAppDispatch} from "../../../store/hooks";
import React from "react";

export const CommentView = (props: {tutorial: Tutorial}) => {
	const dispatch = useAppDispatch();
	const {tutorial} = props;

	return (
		<DialogContent>

		</DialogContent>
	)
}
