import React from "react";
import {Avatar, Box, Button, Stack, Typography} from "@mui/material";

export const CreatorNameCard = () => {
	const name = "Placeholder";
	const subscriberCount = 9;

	return (
		<Box>
			<Stack direction={"row"} spacing={2}>
				<Avatar alt={name} src=""/>
				<Box sx={{flexGrow: 1}}>
					<Typography variant={"body1"}>{name}</Typography>
					<Typography variant={"body2"}>{`${subscriberCount} subscribers`}</Typography>
				</Box>
				<Button variant={"contained"}>Subscribe</Button>
			</Stack>
		</Box>

	)
}
