import {TutorialBrief} from "../client/generated";
import {SidePanel} from "./SidePanel";
import React, {useContext, useState} from "react";
import {Button, DialogActions, DialogContent, Typography} from "@mui/material";
import {ClientContext} from "./index";

export interface TutorialViewerProps {
  tutorial: TutorialBrief;
  onExitTutorial: () => void;
}

export const TutorialViewer = (props: TutorialViewerProps) => {
  const {tutorial, onExitTutorial, ...others} = props;
  const {chromeClient} = useContext(ClientContext);
  const [view, setView] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const handleToggleView = () => {
    setView(!view);
  }

  const handleExitTutorial = () => {
    onExitTutorial();
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
          <Typography variant={"h6"}>{tutorial.title}</Typography>
          <Typography variant={"body1"}>{tutorial.description}</Typography>
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
          <Typography variant={"h6"}>{step.title}</Typography>
          <Typography variant={"body1"}>Description Placeholder, will replace with actual description.</Typography>
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