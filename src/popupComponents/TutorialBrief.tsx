import {Box, Grid, Typography} from "@mui/material";

export const TutorialBrief = (props: { onClick: (e: any) => void }) => {
  const {onClick, ...others} = props;

  return (
    <Box sx={{flexGrow: 1}} padding={1} border={1}>
      <Grid container spacing={3}>
        <Grid item xs={"auto"}>
          <img src={"https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"} alt={"logo"}
               height={60} width={60}/>
        </Grid>
        <Grid item xs={"auto"}>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant={"h6"}>
                Hello World!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>
                Description
              </Typography>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </Box>
  )
};