import {Step, TutorialBrief} from "../client/generated";
import {SidePanel} from "./SidePanel";
import React, {useContext, useEffect, useState} from "react";
import {Button, DialogActions, DialogContent, Typography} from "@mui/material";
import {ClientContext} from "./index";
import {QueryType} from "../chrome/query";
import {Status} from "../chrome/response";
import {Error} from "../shared/Error";

export interface TutorialViewerProps {
  tutorial: TutorialBrief;
  onExitTutorial: () => void;
}

export const TutorialViewer = (props: TutorialViewerProps) => {
  const {tutorial, onExitTutorial, ...others} = props;
  const {chromeClient} = useContext(ClientContext);
  const [stepIndex, setStepIndex] = useState(0);
  const [step, setStep] = useState<Step | undefined>(undefined);
  const [view, setView] = useState(true);
  const [error, setError] = useState<string|undefined>(undefined);
  const [loading, setLoading] = useState<string|undefined>(undefined);

  const handleToggleView = () => {
    setView(!view);
  }

  const handleExitTutorial = () => {
    chromeClient.query({
      type: QueryType.exit,
    }).then(response => {
      if (response.status === Status.error) {
        console.log(response.message);
      }
    }, reason => {
      console.log(reason.message);
    });
    onExitTutorial();
  }

  const handlePrevStep = () => {
    requestStepIndexChange(stepIndex - 1);
  }

  const handleNextStep = () => {
    requestStepIndexChange(stepIndex + 1);
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
    return step ? (
      <>
        <DialogContent>
          <Typography variant={"h6"}>{step.title}</Typography>
          <Typography variant={"body1"}>{step.description}</Typography>
          {createActionList()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrevStep} disabled={stepIndex < 1}>Prev</Button>
          <Button onClick={handleNextStep} disabled={stepIndex >= totalSteps - 1}>Next</Button>
        </DialogActions>
      </>
    ) : (<DialogContent><Error error={"Failed to load current step."}/></DialogContent>)
  }

  const createActionList = () => {
    if (!step || !step.actions) {
      return <Error error={"Failed to load actions for current step."}/>
    }
    return <ul>
      {step.actions.map(action => <li>
        <Typography variant={"h6"}>Action Id: {action.id}</Typography>
        <Typography variant={"body1"}>Mouse action: {action.mouseAction}</Typography>
        <Typography variant={"body1"}>Mouse button: {action.mouseButton}</Typography>
        <Typography variant={"body1"}>Description: {action.description}</Typography>
        <Typography variant={"body1"}>Target: {action.targetElem}</Typography>
      </li>)}
    </ul>
  }

  const requestStep = () => {
    if (tutorial.steps !== undefined && stepIndex < tutorial.steps.length) {
      chromeClient.query({type: QueryType.requestStep}).then(chromeResponse => {
        if (chromeResponse.status === Status.ok) {
          // TODO: validate step
          const requested: Step = chromeResponse.message;
          console.log("[Content.requestStep]: received requested step.", requested)
          setStep(requested);
          setStepIndex(requested.index);
        } else {
          console.log("[Content.requestStep]: request failed from background", chromeResponse.message)
        }
      })
    } else {
      setStep(undefined);
    }
  }

  useEffect(() => {
    requestStep();
  }, [])

  const requestStepIndexChange = (newStepIndex: number) => {
    if (tutorial.steps !== undefined && newStepIndex < tutorial.steps.length) {
      chromeClient.query({type: QueryType.setStepIndex, message: newStepIndex}).then(chromeResponse => {
        if (chromeResponse.status === Status.error) {
          console.warn("[Content]: content and background state mismatch.");
        }
        setStepIndex(chromeResponse.message);
        requestStep();
      }, reason => {
        console.log("[Content]: step change failed", reason.message);
      });
    }
  }

  return (
    <div>
      <SidePanel onToggleView={handleToggleView} onExitTutorial={handleExitTutorial}>
        {view ? createStepView() : createTutorialView()}
      </SidePanel>
    </div>
  );
}