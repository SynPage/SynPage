import {RootState} from "./index";
import {TutorialState} from "./tutorialSlice";
import {Action, Step} from "../../client/generated";

export class TutorialSelectors {
	static currentStep = (state: TutorialState): Step | undefined => {
		return state.tutorial?.steps[state.stepIndex];
	}

	static currentAction = (state: TutorialState): Action | undefined => {
		return this.currentStep(state)?.actions[state.actionIndex];
	}

	static canNextAction = (state: TutorialState): boolean => {
		const totalSteps = state.tutorial?.steps?.length ?? 0;
		const totalActions = this.currentStep(state)?.actions.length ?? 0;
		const stepIndex = state.stepIndex;
		const actionIndex = state.actionIndex;
		return (actionIndex < totalActions - 1) || (stepIndex < totalSteps - 1)
	}

	static canPrevAction = (state: TutorialState) => {
		const currentStep = state.stepIndex;
		const currentAction = state.actionIndex;
		return (currentAction > 0) || (currentStep > 0);
	}
}

export const canNextAction = (state: RootState): boolean => {
	const totalSteps = state.tutorialManager.tutorial?.steps?.length ?? 0;
	const stepIndex = state.tutorialManager.stepIndex;
	const actionIndex = state.tutorialManager.actionIndex;
	const totalActions = state.tutorialManager.tutorial?.steps[stepIndex].actions.length ?? 0;
	return (actionIndex < totalActions - 1) || (stepIndex < totalSteps - 1)
}

export const canPrevAction = (state: RootState) => {
	const currentStep = state.tutorialManager.stepIndex;
	const currentAction = state.tutorialManager.actionIndex;
	return (currentAction > 0) || (currentStep > 0);
}
