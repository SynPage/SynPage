import {Header} from "./Header";
import {Dashboard} from "./Dashboard";
import {Box} from "@mui/material";

export const Panel = () => {
	const drawerWidth = 240;

	return (
		<Box className="panel"
			sx={{
				marginLeft: `${drawerWidth}px`
			}}
		>
			<Header/>
			<Dashboard/>
		</Box>
	)
}
