import {createAsyncThunk} from "@reduxjs/toolkit";
import {tutorialsApi} from "../client";

export const fetchDiscoveryForUser = createAsyncThunk('tutorials/fetchDiscovery', async () => {
	const tutorials = await tutorialsApi.listTutorials(); // TODO: Create an api endpoint for fetching discovery by user
	return tutorials.results;
})

export const fetchTutorialsByPopularity = createAsyncThunk('tutorials/fetchPopular', async () => {
	const tutorials = await tutorialsApi.listTutorials(); // TODO: Create an api endpoint for fetching trending tutorials
	return tutorials.results;
})
