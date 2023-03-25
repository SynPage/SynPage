import {SidePanel, SidePanelView} from "./SidePanel";
import {Step, Tutorial} from "../../../client/generated";
import {ActionCentre} from "./ActionCentre";
import {StepController} from "../index";
import {useEffect, useState} from "react";

export interface UserControllerProps {
	tutorial: Tutorial,
	stepController: StepController
}

export interface SidePanelController {
	open: boolean,
	width: number,
	view: SidePanelView
	toggle: () => void,
	setView: (view: SidePanelView) => void
}

export const UserController = (props: UserControllerProps) => {
	const {tutorial, stepController} = props;
	const [sidePanelWidth, setSidePanelWidth] = useState<number>(300);
	const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(true);
	const [sidePanelView, setSidePanelView] = useState<SidePanelView>(SidePanelView.main);
	const [sidePanelController, setSidePanelController] = useState<SidePanelController>();

	useEffect(() => {
		setSidePanelController({
			open: sidePanelOpen,
			width: sidePanelWidth,
			view: sidePanelView,
			toggle: () => {
				setSidePanelOpen(!sidePanelOpen);
			},
			setView: (view: SidePanelView) => {
				setSidePanelView(view);
			}
		});
	}, [sidePanelOpen, sidePanelWidth, sidePanelView])

	return (
		<div className={"user-controller"}>
			{sidePanelController &&
				<SidePanel tutorial={tutorial} sidePanelController={sidePanelController} stepController={stepController}/>}
			{sidePanelController && <ActionCentre sidePanelController={sidePanelController}/>}
		</div>
	)
}
