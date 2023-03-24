import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {OnPageClient} from "../../chrome/onPageClient";
import {Step, Tutorial} from "../../client/generated";
import {clientLoaded, loadStep} from "./clientThunks";
import {IAOMService} from "../../services/IAOMService";
import {OnPageAOMService} from "../onPageAOMService";

export interface TutorialState {
	chromeClient?: OnPageClient
	aomService?: IAOMService
	tutorial?: Tutorial
	stepIndex: number
	actionIndex: number
	tutorialLoading?: string
	tutorialError?: string
	stepLoading?: string
	stepError?: string
	actionError?: string
	targetElements: Node[]
}

const initialState: TutorialState = {
	actionIndex: 0,
	stepIndex: 0,
	targetElements: []
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
			if (state.actionIndex > 0) {
				state.actionIndex = state.actionIndex - 1;
			} else {
				state.actionIndex = 0;
				state.stepIndex = state.stepIndex - 1;
			}
		},
		nextAction: (state) => {
			const currentAction = state.actionIndex;
			const totalActionsInCurrentStep = state.tutorial?.steps[state.stepIndex].actions.length ?? 0;
			console.log("Next action...")
			if (currentAction < totalActionsInCurrentStep - 1) {
				state.actionIndex = state.actionIndex + 1;
			} else {
				state.actionIndex = 0;
				state.stepIndex = state.stepIndex + 1;
				console.log("StepIndex changed");
			}
		},
		setStepIndex: (state, action: PayloadAction<number>) => {
			state.stepIndex = action.payload;
			state.actionIndex = 0;
		},
		exitTutorial: (state) => {

		}
	},
	extraReducers: (builder) => {
		builder.addCase(loadStep.fulfilled, (state, action) => {
			// state.step = action.payload;
			// console.log("Step loaded", action.payload);
			throw new Error("[LoadStep]: Not implemented")
		}).addCase(clientLoaded.fulfilled, (state, action) => {
			state.chromeClient = action.payload;
			state.aomService = new OnPageAOMService(action.payload)
		})
	},
})

// Action creators are generated for each case reducer function
export const {tutorialLoaded, prevAction, nextAction, setStepIndex} = tutorialSlice.actions

export default tutorialSlice.reducer
