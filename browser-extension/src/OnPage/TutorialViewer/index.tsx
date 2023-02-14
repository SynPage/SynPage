import {Step, Tutorial} from "../../client/generated";
import React, {useContext, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {UserController} from "./UserController";
import {StepViewer} from "./StepViewer";
import {loadStep} from "../store/clientThunks";

export interface TutorialViewerProps {
	tutorial: Tutorial
}

export const TutorialViewer = (props: TutorialViewerProps) => {
	const dispatch = useAppDispatch();
	const {tutorial} = props;
	const step = useAppSelector(state => state.tutorialManager.step);
	const stepIndex = useAppSelector(state => state.tutorialManager.stepIndex);

	useEffect(() => {
		dispatch(loadStep(stepIndex));
	}, [tutorial, stepIndex]);

	return (
		<div className={"tutorial-viewer"}>
			<UserController tutorial={tutorial} step={step}/>
			{step && <StepViewer step={step}/>}
		</div>
	);
}
