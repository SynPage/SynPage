import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {StepBoxEditorComponent} from "./StepBoxEditorComponent";
import {TutorialTextBox} from "../generated";
import {useAppDispatch, useAppSelector} from "../hooks";
import {editStep} from "../reducers/tutorialEditorSlice";

export const StepEditorComponent = (props: {currentStepIndex: number}) => {
    const {currentStepIndex, ...others} = props;
    const dispatch = useAppDispatch();
    const step = useAppSelector(state => state.tutorialEditor.steps?.find(step => step.index === currentStepIndex));

    const handleEditStepName = (newName: string) => {
        step && dispatch(editStep({...step, name: newName}));
    }

    const handleAddStepComponent = () => {
        step && dispatch(editStep({
            ...step,
            textboxes: [
                ...(step.textboxes ?? []),
                {
                    title: "", description: "", targetSelector: "", step_id: -1
                }
            ]
        }));
    }

    const handleEditStepComponent = (componentIndex: number, newComponent: TutorialTextBox) => {
        step && dispatch(editStep(({
            ...step,
            textboxes: [
                ...step.textboxes!.slice(0, componentIndex),
                newComponent,
                ...step.textboxes!.slice(componentIndex + 1, step.textboxes!.length)
            ]
        })));
    }

    return step ? (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container padding={2} component={Paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Edit the Step</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={step.name} label="Step Name"
                                       onChange={(e) => handleEditStepName(e.target.value)}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {step?.textboxes!.map((component, index) =>
                <Grid item xs={12}>
                    <StepBoxEditorComponent stepBox={component}
                                            onEditStepBox={(newComponent) => handleEditStepComponent(index, newComponent)}/>
                </Grid>
            )}
            <Grid item xs={12}>
                <Button variant="outlined" startIcon={<AddIcon/>}
                        onClick={handleAddStepComponent}
                >
                    Add a new component
                </Button>
            </Grid>

        </Grid>
    ) : (<></>);
}