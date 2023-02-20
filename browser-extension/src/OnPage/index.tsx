import {createContext, useEffect, useState} from "react";
import {OnPageClient} from "../chrome/onPageClient";
import {App} from "./App";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "./store/hooks";
import {store} from "./store";
import {getCurrentTab} from "../chrome/utils";

export interface OnPageProps {
	chromeClient: OnPageClient
}

export const OnPage = (props: OnPageProps) => {
	useEffect(() => {
		console.log(chrome);
		// @ts-ignore
		const tree = chrome.automation.getTree((tree: any) => {
			console.log("chrome.automation.GetTree", tree);
		})

	}, [])

	return (
		<Provider store={store}>
			<App {...props}/>
		</Provider>
	);
};
