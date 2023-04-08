import React, {createContext, useEffect, useState} from "react";
import {OnPageClient} from "../chrome/onPageClient";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {clientLoaded, resumeTutorial} from "./store/clientThunks";
import {TutorialViewer} from "./TutorialViewer";

export interface AppProps {
	chromeClient: OnPageClient
}

export const App = (props: AppProps) => {
	const dispatch = useAppDispatch();
	const {chromeClient} = props;
	const tutorial = useAppSelector(state => state.tutorialManager.tutorial);
	const client = useAppSelector(state => state.tutorialManager.chromeClient);
	const index = useAppSelector(state => state.tutorialManager.stepIndex);

	useEffect(() => {
		dispatch(clientLoaded(chromeClient));
	}, []);

	useEffect(() => {
		dispatch(resumeTutorial());
	}, [client]);

	return (
		<div className={"synpage-app"}>
			{tutorial && client && <TutorialViewer tutorial={tutorial} initialIndex={index}/>}
		</div>
	)
}
