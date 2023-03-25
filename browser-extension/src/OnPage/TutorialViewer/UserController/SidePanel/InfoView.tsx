import {Box, DialogContent, Divider, List, ListItemButton, Stack, Typography} from "@mui/material";
import React from "react";
import {Tutorial} from "../../../../client/generated";
import {CreatorNameCard} from "../../../../components/CreatorNameCard";
import {TutorialInfoCard} from "../../../../components/TutorialInfoCard";
import {MediaBox} from "../../../../components/MediaBox";

export const InfoView = (props: { tutorial: Tutorial }) => {
	const {tutorial} = props;
	const recommendations = tutorial.recommendations;

	const handleUpVote = () => {

	}

	const handleDownVote = () => {

	}

	const handleFavorite = () => {

	}

	return (
		<Stack padding={1} spacing={1}>
			<CreatorNameCard/>
			<Divider/>
			<TutorialInfoCard tutorial={tutorial} onUpVote={handleUpVote} onDownVote={handleDownVote}
			                  onSave={handleFavorite}/>
			{recommendations && recommendations.map(r => {
				return (
					<>
						<Divider/>
						<MediaBox src={r.media} title={r.title} description={r.description}/>
					</>
				)
			})}
		</Stack>
	)
}
