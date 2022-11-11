import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tutorial, TutorialStep} from "../generated";
import {AppDispatch, RootState} from "../store";
import {stepsApi, tutorialsApi} from "../client";

interface TutorialEditorState {
    tutorial?: Tutorial
    steps: TutorialStep[]
    loading?: string
    error?: string
}

const initialState: TutorialEditorState = {
    steps: []
};

export const createTutorial = createAsyncThunk<Tutorial, Tutorial, { state: RootState, dispatch: AppDispatch }>(
    'tutorialEditor/createTutorial',
    async (arg, {getState}) => {
        const created = await tutorialsApi.createTutorial(arg);
        return created.data;
    }
)

export const loadTutorial = createAsyncThunk<{ tutorial: Tutorial, steps: TutorialStep[] }, number, { state: RootState, dispatch: AppDispatch }>(
    'tutorialEditor/loadTutorial',
    async (id, {getState}) => {
        const tutorial = await tutorialsApi.retrieveTutorial(id.toString());
        const steps: TutorialStep[] = [] //TODO: await stepsApi.retrieveTutorialStep();
        return {
            tutorial: tutorial.data,
            steps: steps
        };
    }
)

export const tutorialEditorSlice = createSlice({
    name: 'tutorialEditor',
    initialState: initialState,
    reducers: {
        addStep: (state, action: PayloadAction<TutorialStep>) => {
            state.steps.push(action.payload);
        },
        editStep: (state, action: PayloadAction<TutorialStep>) => {
            const index = state.steps.findIndex(step => step.index === action.payload.index);
            state.steps[index] = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createTutorial.pending, (state, action) => {
                state.loading = 'Creating tutorial'
            })
            .addCase(createTutorial.fulfilled, (state, action) => {
                console.log(action.payload);
                state.tutorial = action.payload;
                state.steps = [];
                state.loading = undefined;
                state.error = undefined;
            })
            .addCase(createTutorial.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message
            })
            .addCase(loadTutorial.pending, (state, action) => {
                state.loading = 'Loading tutorial'
            })
            .addCase(loadTutorial.fulfilled, (state, action) => {
                console.log(action.payload);
                state.tutorial = action.payload.tutorial;
                state.steps = action.payload.steps;
                state.loading = undefined;
                state.error = undefined;
            })
            .addCase(loadTutorial.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message;
            })
    },
})

export const {addStep, editStep} = tutorialEditorSlice.actions

export default tutorialEditorSlice.reducer