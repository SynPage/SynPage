import {Button, DialogActions, DialogContent, Typography} from "@mui/material";

export const SidePanelStepView = () => {
    return (
        <>
            <DialogContent>
                <Typography>Hello World</Typography>
            </DialogContent>
            <DialogActions>
                <Button>Prev</Button>
                <Button>Next</Button>
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