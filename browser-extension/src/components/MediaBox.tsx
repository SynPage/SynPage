import {Box, Card, CardMedia, Stack, Typography} from "@mui/material";
import React from "react";

export interface MediaBoxProps {
	src: string
	title: string
	description: string
}

export const MediaBox = (props: MediaBoxProps) => {
	const {src, title, description} = props;

	return (
		<Card sx={{ display: 'flex' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardMedia
					component="img"
					sx={{width: 128, height: 72}}
					image={src}
					alt={title}
				/>
			</Box>
			<Box>
				<Typography variant={"h6"}>{title}</Typography>
				<Typography variant={"body1"}>{description}</Typography>
			</Box>
		</Card>

	)
}
