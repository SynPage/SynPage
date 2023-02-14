import {TutorialInfo} from "../../../client/generated";
import {NameCard} from "../../components/NameCard";
import {useEffect, useState} from "react";
import {tutorialsApi} from "../../../client";
import {Stack} from "@mui/material";

export const Popular = () => {
	const [tutorials, setTutorials] = useState<TutorialInfo[]>([]);
	useEffect(() => {
		tutorialsApi.listTutorials().then(value => {
			value.results && setTutorials(value.results)
		})
	}, [])

  return (
		<div className="popular">
			<Stack spacing={1}>
				{tutorials.map(tutorial => <NameCard tutorial={tutorial}/>)}
			</Stack>

		</div>
  )
}
