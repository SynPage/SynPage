import {Backdrop, CircularProgress, Typography} from "@mui/material";

export const Loading = (props: {loading: string | undefined}) => {
  const {loading} = props;

  return (
    <Backdrop open={!!loading}>
      <CircularProgress/>
      <Typography variant={"body1"}>{loading}</Typography>
    </Backdrop>
  )
}