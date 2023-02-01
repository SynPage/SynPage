import React from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {toggleSidePanel} from "../../../store/controllerInterfaceSlice";

export interface ToolTipProps {

}

export const ToolTip = (props: ToolTipProps) => {
	const dispatch = useAppDispatch();
	const fabBottom = 16;
	const fabRight = 16;
	const sidePanelWidth = useAppSelector(state => {
		return state.controllerInterface.sidePanelOpen ? state.controllerInterface.sidePanelWidth : 0;
	})

	const handleFabBodyClick = () => {
		dispatch(toggleSidePanel());
	}

	return (
		<div>
			<Fab sx={{
				position: 'absolute',
				bottom: fabBottom,
				right: fabRight + sidePanelWidth,
			}} color={'primary'} onClick={handleFabBodyClick}>
				<AddIcon />
			</Fab>
		</div>
	)
}
