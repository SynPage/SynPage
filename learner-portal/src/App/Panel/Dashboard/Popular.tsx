import {TutorialBrief} from "../../../client/generated";
import {NameCard} from "../../components/NameCard";

export const Popular = () => {
	const popularTutorials: TutorialBrief[] = [];

  return (
		<div className="popular">
			{popularTutorials.map(tutorial => <NameCard tutorial={tutorial}/>)}
		</div>
  )
}
