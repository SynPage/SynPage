import {Action, Step} from "../../../client/generated";
import {InstructionDialog} from "./InstructionDialog";
import React, {useEffect, useState} from "react";
import {Layer, Rect, Stage} from "react-konva";
import {StepController} from "../index";
import {prevAction} from "../../store/tutorialSlice";

export interface StepViewerProps {
	step: Step,
	stepController: StepController
}

export interface ActionController {
	canNextAction: () => boolean
	canPrevAction: () => boolean
	nextAction: () => void
	prevAction: () => void
}

export const StepViewer = (props: StepViewerProps) => {
	const {step, stepController} = props;
	const [actionIndex, setActionIndex] = useState<number>(0);
	const [action, setAction] = useState<Action>();
	const [highlighted, setHighlighted] = useState<Element[]>();
	const {canNextStep, canPrevStep, nextStep, prevStep} = stepController

	useEffect(() => {
		const actions = step.actions;
		setAction(actions?.[actionIndex]);
	}, [step, actionIndex])

	const handleHighlight = (elements: Element[]) => {
		setHighlighted(elements);
	}

	const actionController: ActionController = {
		canNextAction: () => {
			return actionIndex < step.actions.length - 1 || canNextStep();
		},
		canPrevAction: () => {
			return actionIndex > 0 || canPrevStep();
		},
		nextAction: () => {
			if (actionIndex < step.actions.length - 1) {
				setActionIndex(actionIndex + 1);
			}
			else {
				nextStep();
				setActionIndex(0);
			}
		},
		prevAction: () => {
			if (actionIndex > 0) {
				setActionIndex(actionIndex - 1);
			}
			else {
				setActionIndex(prevStep().actions.length - 1);
			}
		}
	}

	const highlight = (element: Element) => {
		const rect = element?.getBoundingClientRect();
		if (!rect) {
			return;
		}
		return (
			<Rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} cornerRadius={20} stroke={"red"}/>
		)
	}

	return (
		<div>
			<Stage width={window.innerWidth} height={window.innerHeight}
			       style={{
				       position: 'fixed',
				       top: 0,
				       left: 0,
				       width: '100%',
				       height: '100%',
				       zIndex: 100,
				       pointerEvents: "none"
			       }}
			>
				<Layer>
					{highlighted?.map(el => {
						return highlight(el);
					})}
				</Layer>
			</Stage>
			{action &&
				<InstructionDialog
					action={action}
					actionController={actionController}
					onTargetElement={el => handleHighlight(el ? [el] : [])}
				/>
			}
		</div>
	)
}
