import React from "react";
import { Button, Card, CardActions, CardContent, createStyles, Grid, IconButton, makeStyles, Paper, Popover, Popper, Typography } from "@mui/material";
import { Theme } from "@emotion/react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import TutorialPopperComponent from "./TutorialPopperComponent";
import TutorialStepProp from "../models/TutorialStepProp";

export const TutorialStepComponent = (props: { stepConfig: TutorialStepProp}) => {
    const config = props.stepConfig;

    const poppers = () => {
        return <>
            {props.stepConfig.popperConfigs.map(popperConfig => {
                return <TutorialPopperComponent popperConfig={popperConfig} {...config}/>
            })}
        </>
    }

    return (
        <div id={props.stepConfig.id.toString()}>
            {poppers()}
        </div>
    )
}