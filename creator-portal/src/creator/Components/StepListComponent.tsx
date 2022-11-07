import {Box, Tab, Tabs} from "@mui/material"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {addStep} from "../../reducers/tutorialEditorSlice";

export const StepListComponent = (props:{currentStepIndex: number, onSetStep?: (index: number) => void}) => {
    const dispatch = useAppDispatch();
    const steps = useAppSelector(state => state.tutorialEditor.value.steps);
    
    const handleSetStep = (index: number) => {
        props.onSetStep?.(index);
    }

    const handleAddStep = () => {
        const stepIndex = steps.length;
        dispatch(addStep({index: stepIndex, stepName: "New Step", components: []}))
        handleSetStep(stepIndex);
    };

    return (
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={props.currentStepIndex} variant="scrollable">
                {steps.map(step => <Tab label={step.stepName} onClick={() => handleSetStep(step.index)}/>)}
                <Tab label="Add Step" onClick={handleAddStep}/>
            </Tabs>
        </Box>
    );
}