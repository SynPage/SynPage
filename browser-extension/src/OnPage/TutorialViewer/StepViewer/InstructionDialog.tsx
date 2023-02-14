import {Button, DialogActions, DialogContent, Paper, Popover, Popper, Typography} from "@mui/material";
import {Action} from "../../../client/generated";
import React, {useEffect, useState} from "react";
import {ElementUtils} from "../../../shared/ElementUtils";

export interface InstructionDialogProps {
	action: Action;
	onPrevAction?: () => void;
	onNextAction?: () => void;
}

export const InstructionDialog = (props: InstructionDialogProps) => {
	const {action, onPrevAction, onNextAction} = props;
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);

	useEffect(() => {
		setAnchorEl(action.actionTarget ? ElementUtils.getTargetElement(action.actionTarget) : null);
		console.log("Instructional dialog loaded", action);
	}, [action])

	return (
		<div>
			{anchorEl &&
				<Popper
					open={true}
					anchorEl={anchorEl}
					placement={"auto-start"}
				>
					<Paper>
						<DialogContent>
							<Typography sx={{p: 2}}>{`${action.actionType} ${action.actionType} me.`}</Typography>
							<Typography sx={{p: 2}}>{action.description}</Typography>
						</DialogContent>
						<DialogActions>
							<Button onClick={onPrevAction} disabled={!onPrevAction}>
								Prev
							</Button>
							<Button onClick={onNextAction} disabled={!onNextAction}>
								Next
							</Button>
						</DialogActions>
					</Paper>
				</Popper>}
		</div>
	)
}
