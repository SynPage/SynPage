import {
	Alert,
	Button,
	DialogActions,
	DialogContent,
	Paper,
	Popper, Snackbar,
	Typography
} from "@mui/material";
import {Action} from "../../../client/generated";
import React, {useEffect, useState} from "react";
import {ElementUtils} from "../../../shared/ElementUtils";
import {useAppSelector} from "../../store/hooks";

export interface InstructionDialogProps {
	action: Action;
	onTargetElement?: (element: Element | null) => void;
}

export const InstructionDialog = (props: InstructionDialogProps) => {
	const {action, onTargetElement} = props;
	const chromeClient = useAppSelector(state => state.tutorialManager.chromeClient);
	const [anchorEl, setAnchorEl] = useState<Element | null>(null);
	const resize = new ResizeObserver((entries, observer) => {
		onTargetElement?.(anchorEl);
	});
	const mutation = new MutationObserver((mutations, observer) => {
		onTargetElement?.(anchorEl);
	});

	useEffect(() => {
		updateAnchorElement();
		console.log("Instructional dialog loaded", action);
	}, [action])

	useEffect(() => {
		onTargetElement?.(anchorEl);
	}, [anchorEl])

	const updateAnchorElement = () => {
		if (action.targetElement === undefined) {
			setAnchorEl(null);
			return;
		}
		ElementUtils.getNodeSelectorByDescription(action.targetElement, chromeClient).then((selector) => {
			try {
				const targetElement = document.querySelector(selector);
				if (targetElement) {
					mutation.disconnect();
					resize.disconnect();
					mutation.observe(targetElement, {attributes: true});
					resize.observe(targetElement, {box: "border-box"});
				}
				setAnchorEl(targetElement);
				console.log("Target element found", selector, targetElement)
			} catch (e) {
				setAnchorEl(null);
				console.log("Target element not found", selector, e)
			}
		});
	}

	const content = () => (
		<Paper>
			<DialogContent>
				<Typography sx={{p: 2}}>{`${action.type}`}</Typography>
				<Typography sx={{p: 2}}>{action.targetElement}</Typography>
			</DialogContent>
		</Paper>
	)


	return (
		<div>
			{anchorEl ?
				<Popper
					open={true}
					anchorEl={anchorEl}
					placement={"bottom-end"}
					style={{zIndex: 999}}
				>
					{content()}
				</Popper>
				:
				<Snackbar open={true} autoHideDuration={6000}>
					<Alert severity="error" sx={{ width: '100%' }}>
						{content()}
					</Alert>
				</Snackbar>
			}
		</div>
	)
}
