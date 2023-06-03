import {TutorialInfo} from "../../client/generated";
import {Box, Card, CardMedia, Typography} from "@mui/material";
import React from "react";
import {ExtensionService} from "../../extensionService";

export interface NameCardProps {
	tutorial: TutorialInfo,
	extensionId?: string
}

export const NameCard = (props: NameCardProps) => {
  const {tutorial, extensionId} = props;
	const extensionService = new ExtensionService();

	const handleNameCardClick = (tutorialId: number) => {
		if (tutorialId === -1 || !extensionId) {
			return;
		}
		try {
			extensionService.openTutorial(tutorialId.toString(), extensionId);
		} catch (e) {
			console.log(e);
			return;
		}

	}

	return (
		<Card className="name-card" onClick={() => handleNameCardClick(tutorial.id ?? -1)} sx={{display: "flex"}}>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image="https://mui.com/static/images/cards/live-from-space.jpg"
				alt={tutorial.title}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography variant={"h6"}>{tutorial.title}</Typography>
				<Typography variant={"body1"}>{tutorial.description}</Typography>
			</Box>
		</Card>
  )
}
