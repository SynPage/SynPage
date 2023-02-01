import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export enum SidePanelView {
	main = "main",
	comment = "comment",
	step = "step"
}

export interface ControllerInterfaceState {
	sidePanelOpen: boolean,
	sidePanelWidth: number,
	sidePanelView: SidePanelView
}

const initialState: ControllerInterfaceState = {
	sidePanelOpen: true,
	sidePanelWidth: 250,
	sidePanelView: SidePanelView.main
}

export const controllerInterfaceSlice = createSlice({
	name: 'controllerInterface',
	initialState,
	reducers: {
		toggleSidePanel: (state, action: PayloadAction<void>) => {
			state.sidePanelOpen = !state.sidePanelOpen;
		},
		setSidePanelView: (state, action: PayloadAction<SidePanelView>) => {
			state.sidePanelView = action.payload;
		}
	},
})

// Action creators are generated for each case reducer function
export const { toggleSidePanel, setSidePanelView } = controllerInterfaceSlice.actions

export default controllerInterfaceSlice.reducer
