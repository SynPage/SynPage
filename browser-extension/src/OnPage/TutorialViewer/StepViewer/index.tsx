import {Action, Step} from "../../../client/generated";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {nextAction, prevAction} from "../../store/tutorialSlice";
import {InstructionDialog} from "./InstructionDialog";
import {canNextAction, canPrevAction} from "../../store/tutorialSelectors";
import {useEffect, useState} from "react";

export interface StepViewerProps {
	step: Step
}

export const StepViewer = (props: StepViewerProps) => {
	const {step} = props;
	const dispatch = useAppDispatch();
	const actionIndex = useAppSelector(state => state.tutorialManager.actionIndex);
	const canNextStep = useAppSelector(canNextAction);
	const canPrevStep = useAppSelector(canPrevAction);
	const actions = step.actions;
	const [action, setAction] = useState<Action>();

	useEffect(() => {
		setAction(actions?.[actionIndex]);
	}, [actions, actionIndex])

	const handleNextStep = () => {
		dispatch(nextAction());
	}

	const handlePrevStep = () => {
		dispatch(prevAction());
	}

  return (
		<div>
			{action &&
				<InstructionDialog
					action={action}
					onNextAction={canNextStep ? handleNextStep : undefined}
					onPrevAction={canPrevStep ? handlePrevStep : undefined}
				/>
			}
		</div>
  )
}
