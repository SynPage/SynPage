import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {tutorialsApi, stepsApi} from "../client";
import {AppDispatch, RootState} from "../store";
import {Tutorial, TutorialStep} from "../generated";

interface TutorialEditorState {
    tutorial: Tutorial
    status: string
    error?: string
}

const createEmptyTutorial = (): Tutorial => {
    return {
        name: "Valid Tutorial",
        targetSite: "http://localhost:3000/creator",
        steps: []
    }
};

const initialState: TutorialEditorState = {
    tutorial: createEmptyTutorial(),
    status: "idle",
    error: ""
} as TutorialEditorState

export const publishTutorial = createAsyncThunk<Tutorial, void, {state: RootState, dispatch: AppDispatch}>(
    'tutorialEditor/publishTutorial',
    async (arg, {getState}) => {
        const tutorial = getState().tutorialEditor.tutorial;
        const tutorialResult =  await tutorialsApi.createTutorial(tutorial);
        for (let step in tutorial.steps) {
            console.log(step);
            // const stepsResult = await stepsApi.createTutorialStep(step);
        }
        const result = await tutorialsApi.retrieveTutorial(tutorialResult.data.id!.toString())
        return result.data;
    }
)

export const tutorialEditorSlice = createSlice({
    name: 'tutorialEditor',
    initialState: initialState,
    reducers: {
        addStep: (state, action: PayloadAction<TutorialStep>) => {
            state.tutorial.steps!.push(action.payload);
        },
        editStep: (state, action: PayloadAction<TutorialStep>) => {
            const index = state.tutorial.steps!.findIndex(step => step.index === action.payload.index);
            state.tutorial.steps![index] = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(publishTutorial.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(publishTutorial.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                // state.value = state.value.concat(action.payload)
                console.log(action.payload);
                state.tutorial = createEmptyTutorial();
            })
            .addCase(publishTutorial.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {addStep, editStep} = tutorialEditorSlice.actions

export default tutorialEditorSlice.reducer