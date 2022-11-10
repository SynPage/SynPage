import {Grid, Paper, TextField} from "@mui/material";
import {TutorialTextBox} from "../generated";

export const StepBoxEditorComponent = (props: { stepBox: TutorialTextBox, onEditStepBox: (newComponent: TutorialTextBox) => void }) => {
    const {stepBox, onEditStepBox, ...others} = props;

    const handleEditStepBox = (newComponent: TutorialTextBox) => {
        onEditStepBox(newComponent);
    };

    return (
        <Grid container padding={2} component={Paper}>
            <Grid
                container
                component="form"
                spacing={2}
                noValidate
                autoComplete="off"
            >
                <Grid item xs={6}>
                    <TextField
                        value={stepBox.title}
                        label="Title"
                        fullWidth
                        onChange={(e) => handleEditStepBox({...stepBox, title: e.target.value})}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={stepBox.targetSelector}
                        label="Target Element"
                        fullWidth
                        onChange={(e) => handleEditStepBox({...stepBox, targetSelector: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={stepBox.description}
                        multiline rows={4} label="Description"
                        fullWidth
                        onChange={(e) => handleEditStepBox({...stepBox, description: e.target.value})}
                    />
                </Grid>
            </Grid>
        </Grid>


    )
}