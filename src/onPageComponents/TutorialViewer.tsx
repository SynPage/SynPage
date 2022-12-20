import {Tutorial} from "../generated";
import {SidePanel} from "./SidePanel";
import React, {useState} from "react";
import {SidePanelStepView, SidePanelTutorialView} from "./SidePanelViews";

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

  return (
    <div>
      <SidePanel onToggleView={handleToggleView} onExitTutorial={handleExitTutorial}>
        {view ?
          (tutorial.steps && <SidePanelStepView
            step={tutorial.steps[stepIndex]}
            onPrevStep={(stepIndex > 0) ? handlePrevStep : undefined}
            onNextStep={(stepIndex < tutorial.steps.length - 1) ? handleNextStep : undefined}
          />) :
          <SidePanelTutorialView/>}
      </SidePanel>
    </div>
  );
}