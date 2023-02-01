import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {OnPageClient} from "../../chrome/onPageClient";
import {Step, Tutorial} from "../../client/generated";
import {clientLoaded, loadStep, setStepIndex} from "./clientThunks";

export interface TutorialState {
	chromeClient?: OnPageClient
	tutorial?: Tutorial
	stepIndex: number
	step?: Step
	actionIndex: number
	tutorialLoading?: string
	tutorialError?: string
	stepLoading?: string
	stepError?: string
	actionError?: string
}

const initialState: TutorialState = {
	actionIndex: 0,
	stepIndex: 0
}

export const tutorialSlice = createSlice({
	name: 'tutorialController',
	initialState,
	reducers: {
		tutorialLoaded: (state, action: PayloadAction<Tutorial>) => {
			state.tutorialLoading = undefined;
			state.tutorial = action.payload;
		},
		prevAction: (state) => {

		},
		nextAction: (state) => {

		},
		exitTutorial: (state) => {

		}
	},
	extraReducers: (builder) => {
		builder.addCase(loadStep.fulfilled, (state, action) => {
			state.step = action.payload;
		}).addCase(clientLoaded.fulfilled, (state, action) => {
			state.chromeClient = action.payload;
		}).addCase(setStepIndex.fulfilled, (state, action) => {
			state.stepIndex = action.payload;
		})
	},
})

// Action creators are generated for each case reducer function
export const {tutorialLoaded} = tutorialSlice.actions

export default tutorialSlice.reducer
