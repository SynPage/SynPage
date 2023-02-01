import {Box, Grid, Typography} from "@mui/material";
import {Tutorial} from "../../client/generated";

export interface TutorialNameCardProps {
  tutorial: Tutorial,
  onClick: (e: any) => void
}

export const TutorialNameCard = (props: TutorialNameCardProps) => {
  const {tutorial, onClick, ...others} = props;

  return (
    <Box sx={{flexGrow: 1}} padding={1} border={1} onClick={onClick}>
      <Grid container spacing={3}>
        <Grid item xs={"auto"}>
          <img src={"https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"} alt={"logo"}
               height={60} width={60}/>
        </Grid>
        <Grid item xs={"auto"}>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant={"h6"}>
                {tutorial.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>
                {tutorial.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
};
