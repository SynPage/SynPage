import React from "react";
import {DialogContent, Drawer, Typography} from "@mui/material";

export const Menu = () => {
	const drawerWidth = 240;

	return (
		<div className="menu">
			<Drawer
				variant="persistent"
				open
				sx={{
					width: drawerWidth,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
					},
				}}
			>
				<DialogContent>
					<Typography variant={"body1"}>
						Hello SynPage!
					</Typography>
				</DialogContent>
			</Drawer>
		</div>
	)
}
