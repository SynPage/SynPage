import {Box, Grid} from "@mui/material";
import {TutorialBrief} from "./TutorialBrief";

export const TutorialList = () => {
    return (
        <Box sx={{flexGrow: 1}} padding={1}>
            <Grid container spacing={1} direction={"column"}>
                <Grid item><TutorialBrief onClick={() => {}}/></Grid>
                <Grid item><TutorialBrief onClick={() => {}}/></Grid>
                <Grid item><TutorialBrief onClick={() => {}}/></Grid>
                <Grid item><TutorialBrief onClick={() => {}}/></Grid>
                <Grid item><TutorialBrief onClick={() => {}}/></Grid>
            </Grid>
        </Box>
    )
};