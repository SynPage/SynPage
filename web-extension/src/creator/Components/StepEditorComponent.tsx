import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {StepBoxEditorComponent} from "./StepBoxEditorComponent";
import {TutorialBox} from "../../core/models/TutorialBox";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {editStep} from "../../reducers/tutorialEditorSlice";

export const StepEditorComponent = (props: {currentStepIndex: number}) => {
    const {currentStepIndex, ...others} = props;
    const dispatch = useAppDispatch();
    const step = useAppSelector(state => state.tutorialEditor.value.steps.find(step => step.index === currentStepIndex));

    const handleEditStepName = (newName: string) => {
        step && dispatch(editStep({...step, stepName: newName}));
    }

    const handleAddStepComponent = () => {
        step && dispatch(editStep({
            ...step,
            components: [
                ...step.components,
                {
                    title: "", description: "", targetIdentifier: ""
                }
            ]
        }));
    }

    const handleEditStepComponent = (componentIndex: number, newComponent: TutorialBox) => {
        step && dispatch(editStep(({
            ...step,
            components: [
                ...step.components.slice(0, componentIndex),
                newComponent,
                ...step.components.slice(componentIndex + 1, step.components.length)
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
                            <TextField value={step.stepName} label="Step Name"
                                       onChange={(e) => handleEditStepName(e.target.value)}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {step?.components.map((component, index) =>
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