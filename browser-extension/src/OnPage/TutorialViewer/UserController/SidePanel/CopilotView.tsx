import {Tutorial} from "../../../../client/generated";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	DialogContent,
	IconButton,
	InputBase,
	Paper,
	Typography
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {TutorialNameCard} from "../../../../Popup/components/TutorialNameCard";
import React, {useState} from "react";
import {QueryType} from "../../../../chrome/query";
import {Status, validateResponse} from "../../../../chrome/response";

export const CopilotView = () => {
	const handleGenerate = (question: string) => {
		setLoading("Generating tutorial...");
		// chromeClient.queryBackground({type: QueryType.generate, message: question}).then(chromeResponse => {
		// 	console.log("askAI", chromeResponse);
		// 	setLoading(undefined)
		// 	const {valid, validated} = validateResponse(chromeResponse);
		// 	if (!valid) {
		// 		console.log("Received unexpected response.", chromeResponse);
		// 		setError("Received unexpected response.");
		// 	} else if (chromeResponse.status !== Status.ok) {
		// 		setError(validated.message.toString() ?? "Unknown error.");
		// 	}
		// 	console.log("askAI", validated);
		// 	setGenerated(validated.message as Tutorial);
		// }, reason => {
		// 	console.log("[Popup]: Error occurred when trying to reach background.");
		// 	setLoading(undefined);
		// 	setError(reason.message ?? "Unknown error.");
		// })
	}
	const [error, setError] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState<string | undefined>(undefined);
	const [generated, setGenerated] = useState<Tutorial | undefined>(undefined);

	const handleClickGenerated = () => {

	}

	return (
		<DialogContent>
			<Typography variant="h5">
			Generate Your On-Screen Tutorial
			</Typography>
			<Paper
				component="form"
				sx={{p: '2px 4px', display: 'flex', alignItems: 'center', marginY: 2}}
				elevation={3}
				onSubmit={(e) => {
					setError(undefined);
					setError(undefined);
					e.preventDefault();
					const question = e.currentTarget.querySelector("input")?.value;
					if (!question) {
						setError("Please enter a question.");
						return;
					}
					handleGenerate(question);
				}}
			>
				<InputBase
					sx={{ml: 1, flex: 1}}
					placeholder="How do I find..."
					inputProps={{'aria-label': 'ask ai'}}
					disabled={!!loading}
				/>
				{
					loading ?
						<CircularProgress/> :
						<IconButton type="submit" sx={{p: '10px'}} aria-label="search">
							<ArrowForwardIosIcon/>
						</IconButton>
				}
			</Paper>
			{error &&
				<Alert severity={"error"}>
					{error}
				</Alert>
			}
			{
				(loading || generated) &&
				<TutorialNameCard tutorial={generated} onClick={handleClickGenerated} loading={!!loading}/>
			}
			{
				generated &&
				<Box paddingY={2} display="flex" justifyContent="center">
					<Button variant="contained" sx={{ textTransform: 'none' }}>Regenerate Response</Button>
				</Box>
			}
		</DialogContent>
	)
}
