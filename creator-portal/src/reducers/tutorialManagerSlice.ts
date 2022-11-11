import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tutorialsApi} from "../client";
import {AppDispatch, RootState} from "../store";
import {Tutorial} from "../generated";

interface TutorialManagerState {
    tutorials: Tutorial[];
    toEdit?: Tutorial;
    loading?: string;
    error?: string;
}

const initialState: TutorialManagerState = {
    tutorials: []
} as TutorialManagerState

export const loadTutorials = createAsyncThunk<Tutorial[], number, {state: RootState, dispatch: AppDispatch}>(
    'tutorialManager/loadTutorials',
    async (arg, {getState}) => {
        const tutorials = await tutorialsApi.listTutorials();
        return tutorials.data.results ?? [];
    }
)

export const tutorialManagerSlice = createSlice({
    name: 'tutorialManager',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(loadTutorials.pending, (state, action) => {
                state.loading = 'Loading tutorials';
            })
            .addCase(loadTutorials.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = undefined;
                state.error = undefined;
                state.tutorials = action.payload;
            })
            .addCase(loadTutorials.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message;
            })
    }
})

// export const {} = tutorialEditorSlice.actions

export default tutorialManagerSlice.reducer