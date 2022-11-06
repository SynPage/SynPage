import React, { useEffect } from "react";
import { Card, CardActions, CardContent, IconButton, Popper, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import {TutorialBox} from "../models/TutorialBox";

const TutorialPopperComponent = (props: { popperConfig: TutorialBox, nextStep?: () => void, prevStep?: () => void, canNextStep?: () => boolean, canPrevStep?: () => boolean }) => {
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

export default TutorialPopperComponent