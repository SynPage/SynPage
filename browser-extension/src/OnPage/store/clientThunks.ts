import {createAsyncThunk, Dispatch, ThunkDispatch} from "@reduxjs/toolkit";
import {OnPageClient} from "../../chrome/onPageClient";
import {ChromeQuery, QueryType} from "../../chrome/query";
import {ChromeResponse, Status} from "../../chrome/response";
import {tutorialLoaded} from "./tutorialSlice";
import {Step, Tutorial} from "../../client/generated";
import {AppDispatch, RootState} from "./index";

export const clientLoaded = createAsyncThunk<OnPageClient, OnPageClient, {
	dispatch: AppDispatch
	state: RootState
}>(
	'tutorialController/clientLoaded',
	async (client: OnPageClient, {getState, dispatch}) => {
		await client.listen((query) => handleChromeMessage(query, dispatch), handleChromeError);
		return client;
	}
)

export const resumeTutorial = createAsyncThunk<void, void, {
	dispatch: AppDispatch
	state: RootState
}>(
	'tutorialController/resumeTutorial',
	async (_, {getState, dispatch}) => {
		const client = getState().tutorialManager.chromeClient;
		if (!client) {
			throw Error();
		}
		const tutorial = await client.getOnGoingTutorial();
		if (tutorial) {
			dispatch(tutorialLoaded(tutorial));
		}
	}
)

export const loadStep = createAsyncThunk<Step, void, {
	dispatch: AppDispatch
	state: RootState
}>(
	'tutorialController/loadStep',
	async (stepIndex, {getState}) => {
		const state = getState();
		const client = state.tutorialManager.chromeClient;
		if (!client) {
			throw new Error();
		}
		return client?.requestStep();
	}
)

export const setStepIndex = createAsyncThunk<number, number, {
	dispatch: AppDispatch
	state: RootState
}>(
	'tutorialController/setStep',
	async (stepIndex, {getState}) => {
		const state = getState();
		const client = state.tutorialManager.chromeClient;
		if (!client) {
			throw new Error();
		}
		return client?.requestStepIndexChange(stepIndex);
	}
)

const handleChromeMessage = async (query: ChromeQuery, dispatch: Dispatch): Promise<ChromeResponse> => {
	let response: ChromeResponse = {
		query: query,
		status: Status.error,
	}

	switch (query.type) {
		case QueryType.init:
			let tutorial: Tutorial = query.message;
			dispatch(tutorialLoaded(tutorial));
			response = {
				...response,
				status: Status.ok,
			}
			break;
		default:
			response = {
				...response,
				status: Status.error,
				message: "[Content]: Unexpected query type."
			}
	}
	return response;
}

const handleChromeError = async (query: ChromeQuery, message: string): Promise<ChromeResponse> => {
	return {
		query: query,
		status: Status.error,
		message: message
	}
}