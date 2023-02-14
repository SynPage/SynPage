import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useState} from "react";
import {Tutorial} from "../../../../client/generated";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {StepActionList} from "../../../../components/StepActionList";
import {setStepIndex} from "../../../store/tutorialSlice";

export const OutlineView = (props: {tutorial: Tutorial}) => {
	const dispatch = useAppDispatch();
	const {tutorial} = props;
	const currentStepIndex = useAppSelector(state => state.tutorialManager.stepIndex);

	const handleStepItemClick = (selectedIndex: number) => {
		dispatch(setStepIndex(selectedIndex));
	}

	return (
		<Box className={"outline-view"}>
			{tutorial.steps && tutorial.steps.map(step => (
				<Accordion expanded={step.index === currentStepIndex} onChange={() => handleStepItemClick(step.index)}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography>{step.title}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>{step.description}</Typography>
						<StepActionList step={step}/>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	)
}
