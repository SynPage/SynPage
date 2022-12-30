import {Alert} from "@mui/material";

export const Error = (props: {error: string | undefined}) => {
  const {error} = props;

  return (
    <div>{error && <Alert severity={"error"}>{error}</Alert> }</div>
  )
}