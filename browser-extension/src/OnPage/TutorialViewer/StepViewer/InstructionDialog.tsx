import {
	Button,
	DialogActions,
	DialogContent,
	Paper,
	Popper,
	Typography
} from "@mui/material";
import {Action} from "../../../client/generated";
import React, {useEffect, useState} from "react";
import {ActionController} from "./index";
import {ElementUtils} from "../../../shared/ElementUtils";

export interface InstructionDialogProps {
	action: Action;
	actionController: ActionController;
	onTargetElement?: (element: Element) => void;
}

export const InstructionDialog = (props: InstructionDialogProps) => {
	const {action, actionController, onTargetElement} = props;
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const {canNextAction, canPrevAction, nextAction, prevAction} = actionController;

	useEffect(() => {
		if (!action.targetElement) {
			throw new Error("No target element found");
		}
		ElementUtils.getNodeSelectorByDescription(action.targetElement).then((selector) => {
			const targetElement = document.querySelector(selector);
			setAnchorEl(targetElement);
			if (targetElement) {
				onTargetElement?.(targetElement);
			}
			console.log("Target element found", selector, targetElement)
		});
		console.log("Instructional dialog loaded", action);
	}, [action])

	const content = () => (
		<Paper>
			<DialogContent>
				<Typography sx={{p: 2}}>{`${action.type}`}</Typography>
				<Typography sx={{p: 2}}>{action.targetElement}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={prevAction} disabled={!canPrevAction()}>
					Prev
				</Button>
				<Button onClick={nextAction} disabled={!canNextAction()}>
					Next
				</Button>
			</DialogActions>
		</Paper>
	)


	return (
		<div>
			{anchorEl ?
				<Popper
					open={true}
					anchorEl={anchorEl}
					placement={"bottom-end"}
				>
					{content()}
				</Popper>
				:
				<Popper
					open={true}
				>
					{content()}
				</Popper>}
		</div>
	)
}
