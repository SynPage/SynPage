import React, {useContext, useEffect, useState} from "react";
import {StepViewer} from "./StepViewer";
import {Step, Tutorial} from "../../client/generated";

export interface TutorialViewerProps {
	tutorial: Tutorial
}

export interface StepController {
	canNextStep: () => boolean
	canPrevStep: () => boolean
	nextStep: () => Step
	prevStep: () => Step
}

export const TutorialViewer = (props: TutorialViewerProps) => {
	const {tutorial} = props;
	const [stepIndex, setStepIndex] = useState<number>(0);
	const [step, setStep] = useState<Step|undefined>();

	useEffect(() => {
		setStep(tutorial.steps[stepIndex]);
	}, [stepIndex])

	const stepController: StepController = {
		canNextStep: () => {
			return stepIndex < tutorial.steps.length - 1;
		},
		canPrevStep: () => {
			return stepIndex > 0;
		},
		nextStep: () => {
			setStepIndex(stepIndex + 1);
			return tutorial.steps[stepIndex + 1];
		},
		prevStep: () => {
			setStepIndex(stepIndex - 1);
			return tutorial.steps[stepIndex - 1];
		}
	}

	return (
		<div className={"tutorial-viewer"}>
			{/*<UserController tutorial={tutorial}/>*/}
			{step && <StepViewer step={step} stepController={stepController}/>}
		</div>
	);
}
