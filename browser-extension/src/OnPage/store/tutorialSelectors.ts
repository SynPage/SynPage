import {RootState} from "./index";

export const canNextAction = (state: RootState) => {
	const totalSteps = state.tutorialManager.tutorial?.steps?.length ?? 0;
	const totalActionsInCurrentStep = state.tutorialManager.step?.actions?.length ?? 0;
	const currentStep = state.tutorialManager.stepIndex;
	const currentAction = state.tutorialManager.actionIndex;
	return (currentAction < totalActionsInCurrentStep - 1) || (currentStep < totalSteps - 1)
}

export const canPrevAction = (state: RootState) => {
	const currentStep = state.tutorialManager.stepIndex;
	const currentAction = state.tutorialManager.actionIndex;
	return (currentAction > 0) || (currentStep > 0);
}
