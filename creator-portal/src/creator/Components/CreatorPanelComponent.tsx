import {AppBar, Box, Button, Divider, Grid, Toolbar, Typography} from "@mui/material"
import {StepListComponent} from "./StepListComponent"
import {useState} from "react";
import {StepEditorComponent} from "./StepEditorComponent";
import {StepPreviewComponent} from "./StepPreviewComponent";
import {useAppDispatch} from "../../hooks";
import {publishTutorial} from "../../reducers/tutorialEditorSlice";

export const CreatorPanelComponent = () => {
    const dispatch = useAppDispatch();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleSetStepIndex = (index: number) => {
        setCurrentStepIndex(index);
    }

    const handlePublishTutorial = () => {
        console.log("Dispatching publish TUT.")
        dispatch(publishTutorial());
    }

    return (
        <Box sx={{width: '100%'}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" flexGrow={1}>Creator</Typography>
                    <Button color="inherit" onClick={handlePublishTutorial}>Publish Tutorial</Button>
                </Toolbar>
            </AppBar>

            <StepListComponent currentStepIndex={currentStepIndex}
                               onSetStep={handleSetStepIndex}/>

            <Box padding={2}>
                <Grid container spacing={2}>
                    <Grid item xs={5} padding={2}>
                        <StepEditorComponent currentStepIndex={currentStepIndex}/>
                    </Grid>
                    <Divider orientation="vertical" flexItem variant="fullWidth"/>
                    <Grid item xs={6} padding={2}>
                        <StepPreviewComponent/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}