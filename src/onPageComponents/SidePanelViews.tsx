import {Button, DialogActions, DialogContent, Typography} from "@mui/material";
import {TutorialStep} from "../generated";

export interface SidePanelStepViewProps {
  step: TutorialStep,
  onNextStep?: () => void,
  onPrevStep?: () => void,
}

export const SidePanelStepView = (props: SidePanelStepViewProps) => {
  const {step, onPrevStep, onNextStep} = props;

  return (
    <>
      <DialogContent>
        <Typography>{step.name}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onPrevStep} disabled={!onPrevStep}>Prev</Button>
        <Button onClick={onNextStep} disabled={!onNextStep}>Next</Button>
      </DialogActions>
    </>
  )
}

export const SidePanelTutorialView = () => {
  return (
    <>
      <DialogContent>
        <Typography>Tutorial</Typography>
      </DialogContent>
      <DialogActions>
        <Button>Prev</Button>
        <Button>Next</Button>
      </DialogActions>
    </>
  )
}