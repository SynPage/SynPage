import {Tutorial} from "../generated";
import {SidePanel} from "./SidePanel";
import React, {useState} from "react";
import {Button, DialogActions, DialogContent, Typography} from "@mui/material";

export interface TutorialViewerProps {
  tutorial: Tutorial;
}

export const TutorialViewer = (props: TutorialViewerProps) => {
  const {tutorial, ...others} = props;
  const [view, setView] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const handleToggleView = () => {
    setView(!view);
  }

  const handleExitTutorial = () => {

  }

  const handlePrevStep = () => {
    setStepIndex(stepIndex - 1);
  }

  const handleNextStep = () => {
    setStepIndex(stepIndex + 1);
  }

  const handleStepItemClick = (index: number) => {
    setStepIndex(index);
    setView(!view);
  }

  const createTutorialView = () => {
    return (
      <>
        <DialogContent>
          <Typography>{tutorial.name}</Typography>
        </DialogContent>
      </>
    )
  }

  const createStepView = () => {
    const totalSteps = tutorial.steps?.length ?? 0;
    const step = tutorial.steps?.at(stepIndex);
    return step && (
      <>
        <DialogContent>
          <Typography>{step.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrevStep} disabled={stepIndex < 1}>Prev</Button>
          <Button onClick={handleNextStep} disabled={stepIndex >= totalSteps - 1}>Next</Button>
        </DialogActions>
      </>
    )
  }

  return (
    <div>
      <SidePanel onToggleView={handleToggleView} onExitTutorial={handleExitTutorial}>
        {view ? createStepView() : createTutorialView()}
      </SidePanel>
    </div>
  );
}