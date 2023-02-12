import React from "react";
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setSidePanelView, SidePanelView, toggleSidePanel} from "../../../store/controllerInterfaceSlice";
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';

export interface ActionCentreProps {

}

export const ActionCentre = (props: ActionCentreProps) => {
	const dispatch = useAppDispatch();
	const fabBottom = 16;
	const fabRight = 16;
	const sidePanelWidth = useAppSelector(state => {
		return state.controllerInterface.sidePanelOpen ? state.controllerInterface.sidePanelWidth : 0;
	})

	const actions = [
		{icon: <FileCopyIcon/>, view: SidePanelView.step},
		{icon: <SaveIcon/>, view: SidePanelView.comment},
		{icon: <PrintIcon/>, view: SidePanelView.main},
	];

	const handleSpeedDialViewClick = (view: SidePanelView) => {
		dispatch(setSidePanelView(view));
	}

	return (
		<Box>
			<SpeedDial
				ariaLabel="Action Centre"
				sx={{position: 'absolute', bottom: 16, right: (16 + sidePanelWidth)}}
				icon={<SpeedDialIcon/>}
				direction={"left"}
				onDoubleClick={() => {
					dispatch(toggleSidePanel())
				}}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.view}
						icon={action.icon}
						tooltipTitle={action.view}
						onClick={(e) => {
							handleSpeedDialViewClick(action.view);
						}}
					/>
				))}
			</SpeedDial>
		</Box>
	)
}
