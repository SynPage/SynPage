import React from "react";
import { Button, Card, CardActions, CardContent, createStyles, Grid, IconButton, makeStyles, Paper, Popover, Popper, Typography } from "@mui/material";
import { Theme } from "@emotion/react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { PopperConfig } from "./PopperConfig";

export const TutorialPopperComponent = (props: { popperConfig: PopperConfig, nextStep?: () => void, prevStep?: () => void, canNextStep?: () => boolean, canPrevStep?: () => boolean }) => {
    return (
        <Popper open={true}
            anchorEl={document.querySelector(props.popperConfig.targetIdentifier.toString())}
            placement="bottom-start"
        >
            <Card>
                <CardContent>
                    <Typography variant="h6">{props.popperConfig.title}</Typography>
                    <Typography variant="body1">{props.popperConfig.description}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={props.prevStep} disabled={!props.canPrevStep?.()}><NavigateBeforeIcon /></IconButton>
                    <IconButton style={{ marginLeft: "auto" }} onClick={props.nextStep} disabled={!props.canNextStep?.()}><NavigateNextIcon /></IconButton>
                </CardActions>
            </Card>
        </Popper >
    )
}