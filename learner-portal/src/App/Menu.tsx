import React from "react";
import {Drawer} from "@mui/material";

export const Menu = () => {
	return (
		<div className="menu">
			<Drawer
				variant="permanent"
				open
			>
				Hello SynPage!
			</Drawer>
		</div>
	)
}
