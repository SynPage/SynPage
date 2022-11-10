import {Box, Tab, Tabs} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../hooks";
import {addStep} from "../reducers/tutorialEditorSlice";

export const StepListComponent = (props:{currentStepIndex: number, onSetStep?: (index: number) => void}) => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(state => state.tutorialEditor.tutorial.steps);
    
    const handleSetStep = (index: number) => {
        props.onSetStep?.(index);
    }

    const handleAddStep = () => {
        const stepIndex = steps!.length;
        dispatch(addStep({index: stepIndex, name: "New Step", textboxes: [], tutorial_id: -1}))
        handleSetStep(stepIndex);
    };

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={props.currentStepIndex} variant="scrollable">
                {steps!.map(step => <Tab label={step.name} onClick={() => handleSetStep(step.index)}/>)}
                <Tab label="Add Step" onClick={handleAddStep}/>
            </Tabs>
        </Box>
    );
}