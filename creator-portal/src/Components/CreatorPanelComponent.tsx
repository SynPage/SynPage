import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider, FormControl,
    Grid, TextField,
    Toolbar,
    Typography
} from "@mui/material"
import {StepListComponent} from "./StepListComponent"
import {useState} from "react";
import {StepEditorComponent} from "./StepEditorComponent";
import {StepPreviewComponent} from "./StepPreviewComponent";
import {useAppDispatch, useAppSelector} from "../hooks";
import {useNavigate} from "react-router-dom";

export const CreatorPanelComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const error = useAppSelector(s => s.tutorialEditor.error);
    const loading = useAppSelector(s => s.tutorialEditor.loading);

    const handleSetStepIndex = (index: number) => {
        setCurrentStepIndex(index);
    }

    const handlePublishTutorial = () => {
        console.log("Dispatching publish TUT.")
        // dispatch(publishTutorial());
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
            <Backdrop
                open={!!loading}
            >
                <CircularProgress color="inherit" />
                <Typography variant="body1">{loading}</Typography>
            </Backdrop>
            <Dialog open={!!error}>
                <DialogTitle>Create a new tutorial</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Failed to create tutorial with the following error message: {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate("/")}>Back to main page</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}