import {DialogContent, List, ListItemButton, Typography} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import {Tutorial} from "../../../../client/generated";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setStepIndex} from "../../../store/clientThunks";

export const OutlineView = (props: {tutorial: Tutorial}) => {
	const dispatch = useAppDispatch();
	const {tutorial} = props;
	const currentStepIndex = useAppSelector(state => state.tutorialManager.stepIndex);

	const handleStepItemClick = (selectedIndex: number) => {
		dispatch(setStepIndex(selectedIndex));
	}

	return (
		<DialogContent>
			<Typography variant={"h6"}>{tutorial.title}</Typography>
			<Typography variant={"body1"}>{tutorial.description}</Typography>
			<List>
				{tutorial.steps && tutorial.steps.map(step => (
					<ListItemButton onClick={() => handleStepItemClick(step.index)}>
						{(step.index === currentStepIndex) && <KeyboardArrowRightIcon/>}
						<Typography variant={"body1"}>{step.title}</Typography>
					</ListItemButton>
				))}
			</List>
		</DialogContent>
	)
}
