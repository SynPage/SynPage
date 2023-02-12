import {TutorialBrief} from "../../client/generated";
import {Box, Card, CardMedia} from "@mui/material";
import React from "react";
import {ExtensionService} from "../../extensionService";

export interface NameCardProps {
	tutorial: TutorialBrief
}

export const NameCard = (props: NameCardProps) => {
  const {tutorial} = props;
	const extensionService = new ExtensionService();

	const handleNameCardClick = (tutorialId: number) => {
		try {
			extensionService.openTutorial(tutorialId.toString());
		} catch (e) {
			console.log(e);
			return;
		}

	}

	return (
		<Card className="name-card" onClick={() => handleNameCardClick(1)}>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image="https://mui.com/static/images/cards/live-from-space.jpg"
				alt={tutorial.title}
			/>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>

			</Box>
		</Card>
  )
}
