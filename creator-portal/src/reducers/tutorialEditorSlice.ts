import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tutorial, TutorialStep} from "../generated";
import {AppDispatch, RootState} from "../store";
import {stepsApi, textBoxesApi, tutorialsApi} from "../client";

interface TutorialEditorState {
    tutorial?: Tutorial
    steps: TutorialStep[]
    currentStepIndex: number
    loading?: string
    error?: string
}

const initialState: TutorialEditorState = {
    steps: [],
    currentStepIndex: -1
};

export const loadTutorial = createAsyncThunk<{ tutorial: Tutorial, steps: TutorialStep[] }, number, { state: RootState, dispatch: AppDispatch }>(
    'tutorialEditor/loadTutorial',
    async (id, {getState}) => {
        const tutorial = await tutorialsApi.retrieveTutorial(id.toString());
        const steps: TutorialStep[] = tutorial.data.steps ?? [];
        return {
            tutorial: tutorial.data,
            steps: steps
        };
    }
)

export const createNewStep = createAsyncThunk<TutorialStep, void, { state: RootState, dispatch: AppDispatch }>(
    'tutorialEditor/createNewStep',
    async (_, {getState, rejectWithValue}) => {
        const editorState = getState().tutorialEditor;
        const tutorial = editorState.tutorial;

        if (!tutorial || !tutorial.id) {
            return rejectWithValue("Tutorial does not exist");
        }
        const step = await stepsApi.createTutorialStep({
            name: "New Step",
            index: editorState.currentStepIndex + 1,
            tutorial_id: tutorial.id
        });
        return step.data;
    }
)

export const saveCurrentStep = createAsyncThunk<TutorialStep, void, { state: RootState, dispatch: AppDispatch }>(
    'tutorialEditor/saveCurrentStep',
    async (index, {getState, rejectWithValue}) => {
        const editorState = getState().tutorialEditor;
        const tutorial = editorState.tutorial;
        const steps = editorState.steps;
        if (!tutorial || !tutorial.id) {
            return rejectWithValue("Tutorial does not exist");
        }
        const step = steps[editorState.currentStepIndex];
        if (!step || !step.id) {
            return rejectWithValue("Step does not exist");
        }
        const stepCreation = await Promise.all(step.textboxes?.map(textbox => {
            if (textbox.id) {
                return textBoxesApi.updateTutorialTextBox(textbox.id.toString(), textbox);
            } else {
                return textBoxesApi.createTutorialTextBox({...textbox, step_id: step.id!});
            }
        }) ?? []);

        const updatedStep = await stepsApi.updateTutorialStep(step.id.toString(), step);

        return updatedStep.data;
    }
)

export const tutorialEditorSlice = createSlice({
    name: 'tutorialEditor',
    initialState: initialState,
    reducers: {
        editorError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        // addStep: (state, action: PayloadAction<TutorialStep>) => {
        //     state.steps.push(action.payload);
        // },
        editStep: (state, action: PayloadAction<TutorialStep>) => {
            const index = state.steps.findIndex(step => step.index === action.payload.index);
            state.steps[index] = action.payload;
        },
        setCurrentStepIndex: (state, action: PayloadAction<number>) => {
            state.currentStepIndex = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loadTutorial.pending, (state, action) => {
                state.loading = 'Loading tutorial'
            })
            .addCase(loadTutorial.fulfilled, (state, action) => {
                const {tutorial, steps} = action.payload;
                state.tutorial = tutorial;
                state.steps = steps;
                state.currentStepIndex = steps.length > 0 ? 0 : -1;
                state.loading = undefined;
                state.error = undefined;
            })
            .addCase(loadTutorial.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message;
            })
            .addCase(createNewStep.pending, (state, action) => {
                state.loading = 'Creating step'
            })
            .addCase(createNewStep.fulfilled, (state, action) => {
                console.log(action.payload);
                const created = action.payload;
                state.steps.push(created);
                state.currentStepIndex = created.index;
                state.loading = undefined;
                state.error = undefined;
            })
            .addCase(createNewStep.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message;
            })
            .addCase(saveCurrentStep.pending, (state, action) => {
                state.loading = 'Updating step'
            })
            .addCase(saveCurrentStep.fulfilled, (state, action) => {
                const updatedStep = action.payload;
                state.steps[updatedStep.index] = updatedStep;
                state.currentStepIndex = updatedStep.index;
                state.error = undefined;
                state.loading = undefined;
            })
            .addCase(saveCurrentStep.rejected, (state, action) => {
                state.loading = undefined;
                state.error = action.error.message;
            })
    },
})

export const {editorError, editStep, setCurrentStepIndex} = tutorialEditorSlice.actions

export default tutorialEditorSlice.reducer