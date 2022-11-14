import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tutorialsApi} from "../client";
import {AppDispatch, RootState} from "../store";
import {Tutorial} from "../generated";
import {AxiosError} from "axios";

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

export const createTutorial = createAsyncThunk<Tutorial, Tutorial, { state: RootState, dispatch: AppDispatch }>(
    'tutorialManager/createTutorial',
    async (arg, {getState, rejectWithValue}) => {
        const result = await tutorialsApi.createTutorial(arg).catch((err: AxiosError) => err);
        if (result instanceof AxiosError) {
            return rejectWithValue(result);
        }
        return result.data;
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
            .addCase(createTutorial.pending, (state, action) => {
                state.error = undefined
                state.loading = 'Creating tutorial'
            })
            .addCase(createTutorial.fulfilled, (state, action) => {
                console.log(action.payload);
                state.toEdit = action.payload;
                state.loading = undefined;
                state.error = undefined;
            })
            .addCase(createTutorial.rejected, (state, action) => {
                state.loading = undefined;
                let errorMessage = action.error.message;
                if (action.payload instanceof AxiosError) {
                    const err = action.payload;
                    if (err.response) {
                        errorMessage = JSON.stringify(err.response.data);
                    } else {
                        errorMessage = err.message;
                    }
                }
                state.error = errorMessage;
            })
    }
})

// export const {} = tutorialEditorSlice.actions

export default tutorialManagerSlice.reducer