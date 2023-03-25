import React, {useContext, useEffect, useState} from "react";
import {StepViewer} from "./StepViewer";
import {Step, Tutorial} from "../../client/generated";
import {UserController} from "./UserController";

export interface TutorialViewerProps {
	tutorial: Tutorial
}

export interface StepController {
	canNextStep: () => boolean
	canPrevStep: () => boolean
	nextStep: () => Step
	prevStep: () => Step
	setStep: (index: number) => Step
	stepIndex: number
}

export const TutorialViewer = (props: TutorialViewerProps) => {
	const {tutorial} = props;
	const [stepIndex, setStepIndex] = useState<number>(0);
	const [step, setStep] = useState<Step|undefined>();
	const [stepController, setStepController] = useState<StepController>();

	useEffect(() => {
		setStep(tutorial.steps[stepIndex]);
	}, [stepIndex])

	useEffect(() => {
		setStepController({
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
			},
			setStep: (index: number) => {
				setStepIndex(index);
				return tutorial.steps[index];
			},
			stepIndex: stepIndex
		})
	}, [step, stepIndex])

	return (
		<div className={"tutorial-viewer"}>
			{stepController && <UserController tutorial={tutorial} stepController={stepController}/>}
			{step && stepController && <StepViewer step={step} stepController={stepController}/>}
		</div>
	);
}
