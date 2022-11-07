import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TutorialStep} from "../core/models/TutorialStep";
import {Tutorial} from "../core/models/Tutorial";
import {postPublishTutorial} from "../client";
import {AppDispatch, RootState} from "../store";

interface TutorialState {
    value: Tutorial
    status: string
    error?: string
}

const initialState: TutorialState = {
    value: {steps: [], name: "", id: "", targetSite: ""},
    status: "idle",
    error: ""
} as TutorialState

export const publishTutorial = createAsyncThunk<Tutorial, void, {state: RootState, dispatch: AppDispatch}>(
    'tutorialEditor/publishTutorial',
    async (arg, {getState}) => {
        return await postPublishTutorial(getState().tutorialEditor.value)
    }
)

export const tutorialEditorSlice = createSlice({
    name: 'tutorialEditor',
    initialState: initialState,
    reducers: {
        addStep: (state, action: PayloadAction<TutorialStep>) => {
            state.value.steps.push(action.payload);
        },
        editStep: (state, action: PayloadAction<TutorialStep>) => {
            const index = state.value.steps.findIndex(step => step.index === action.payload.index);
            state.value.steps[index] = action.payload;
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
                state.value = {steps: [], name: "", id: "", targetSite: ""};
            })
            .addCase(publishTutorial.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const {addStep, editStep} = tutorialEditorSlice.actions

export default tutorialEditorSlice.reducer