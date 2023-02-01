import {DialogContent, List, ListItemButton, Typography} from "@mui/material";
import React from "react";
import {Tutorial} from "../../../../client/generated";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

export const InfoView = (props: {tutorial: Tutorial}) => {
	const dispatch = useAppDispatch();
	const {tutorial} = props;

	return (
		<DialogContent>

		</DialogContent>
	)
}
