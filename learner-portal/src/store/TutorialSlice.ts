import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'
import {fetchDiscoveryForUser, fetchTutorialsByPopularity} from "./TutorialThunks";

// Define a type for the slice state
interface TutorialState {

}

// Define the initial state using that type
const initialState: TutorialState = {

}

export const tutorialSlice = createSlice({
	name: 'tutorial',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {

	},
	extraReducers: builder => {
		builder
			.addCase(fetchDiscoveryForUser.pending, (state, action) => {
				throw new Error("Not implemented");
			})
			.addCase(fetchDiscoveryForUser.fulfilled, (state, action) => {
				throw new Error("Not implemented");
			})
			.addCase(fetchDiscoveryForUser.rejected, (state, action) => {
				throw new Error("Not implemented");
			})
			.addCase(fetchTutorialsByPopularity.pending, (state, action) => {
				throw new Error("Not implemented");
			})
			.addCase(fetchTutorialsByPopularity.fulfilled, (state, action) => {
				throw new Error("Not implemented");
			})
			.addCase(fetchTutorialsByPopularity.rejected, (state, action) => {
				throw new Error("Not implemented");
			})
	}
})

export const { } = tutorialSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default tutorialSlice.reducer
