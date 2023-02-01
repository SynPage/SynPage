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

	useEffect(() => {
		dispatch(clientLoaded(chromeClient));
	}, []);

	useEffect(() => {
		dispatch(resumeTutorial());
	}, [client]);

	return (
		<div className={"synpage-app"}>
			{tutorial && <TutorialViewer tutorial={tutorial}/>}
		</div>
	)
}
