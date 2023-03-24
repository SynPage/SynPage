import {Button, DialogActions, DialogContent, Paper, Popover, Popper, Snackbar, Typography} from "@mui/material";
import {Action} from "../../../client/generated";
import React, {useEffect, useState} from "react";
import {ElementUtils} from "../../../shared/ElementUtils";
import {ActionController} from "./index";
import {OnPageAOMService} from "../../onPageAOMService";

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
		// const targetElement = action.targetElement ? ElementUtils.getTargetElement(action.targetElement) : null
		// aomService.getNodeSelector(action.targetElement!).then((selector) => {
		// 	const targetElement = ElementUtils.getTargetElement(selector);
		// 	setAnchorEl(targetElement);
		// 	if (targetElement) {
		// 		onTargetElement?.(targetElement);
		// 	}
		// 	console.log("Target element found", selector, targetElement)
		// })
		// const targetElement = document.body;
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
				<Popover
					open={true}
					anchorEl={document.body}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					{content()}
				</Popover>}
		</div>
	)
}
