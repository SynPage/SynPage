import {Step} from "../client/generated";
import {Box, Typography} from "@mui/material";
import React from "react";

export interface StepActionListProps {
	step: Step
}

export const StepActionList = (props: StepActionListProps) => {
	const {step} = props;

	return (
		<Box>
			{step.actions && <ul>
				{step.actions.map(action => <li>
					<Typography variant={"h6"}>Action Description: {action.description}</Typography>
					<Typography variant={"h6"}>Action Type: {action.actionType}</Typography>
					<Typography variant={"h6"}>Action Target: {action.actionTarget}</Typography>
					<Typography variant={"h6"}>Action Content: {action.actionContent}</Typography>
				</li>)}
			</ul>}
		</Box>
	)
}
