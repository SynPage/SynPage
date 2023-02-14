import {TutorialInfo} from "../../../client/generated";
import {NameCard} from "../../components/NameCard";
import {useEffect, useState} from "react";
import {tutorialsApi} from "../../../client";
import {Box, FormControl, Stack, TextField} from "@mui/material";

export const Popular = () => {
	const [tutorials, setTutorials] = useState<TutorialInfo[]>([]);
	const [extensionId, setExtensionId] = useState(process.env.REACT_APP_EXTENSION_ID);
	useEffect(() => {
		tutorialsApi.listTutorials().then(value => {
			value.results && setTutorials(value.results)
		})
	}, [])

  return (
		<div className="popular">
			<Box margin={1}>
				<TextField
					label={"SynPage extension id"}
					value={extensionId}
					onChange={value => setExtensionId(value.target.value)}
					fullWidth={true}
				/>
			</Box>

			<Stack spacing={1}>
				{tutorials.map(tutorial => <NameCard tutorial={tutorial} extensionId={extensionId}/>)}
			</Stack>

		</div>
  )
}
