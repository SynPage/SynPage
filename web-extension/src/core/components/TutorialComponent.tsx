import React, { useState } from "react";
import { Button, Card, CardActions, CardContent, createStyles, Grid, IconButton, makeStyles, Paper, Popover, Popper, Typography } from "@mui/material";
import { Theme } from "@emotion/react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import TutorialProp from "../models/TutorialProp";
import { TutorialStepComponent } from "./TutorialStepComponent";

export const TutorialComponent = (props: { tutorial: TutorialProp }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const canNextStep = () => {
        return currentStep < props.tutorial.steps.length - 1;
    }

    const canPrevStep = () => {
        return currentStep > 0;
    }

    const steps = props.tutorial.steps;
    steps.forEach(step => {
        step.nextStep = handleNextStep;
        step.prevStep = handlePrevStep;
        step.canNextStep = canNextStep;
        step.canPrevStep = canPrevStep;
    })

    return (
        <TutorialStepComponent stepConfig={props.tutorial.steps[currentStep]}/>
    )
}