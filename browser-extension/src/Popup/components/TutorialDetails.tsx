import {Box} from "@mui/material";
import {Tutorial} from "../../client/generated";

export interface TutorialDetailsProps {
	tutorial: Tutorial;
}

export const TutorialDetails = (props: TutorialDetailsProps) => {
	const {tutorial} = props;

	return (
		<Box sx={{flexGrow: 1}} padding={1}>

		</Box>
	)
}
