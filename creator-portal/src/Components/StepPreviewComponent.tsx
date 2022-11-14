import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch} from "../hooks";
import {saveCurrentStep} from "../reducers/tutorialEditorSlice";

export const StepPreviewComponent = () => {
    const dispatch = useAppDispatch();

    return <Box><Button variant="outlined" onClick={() => dispatch(saveCurrentStep())}>Save Step</Button></Box>
}