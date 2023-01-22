import {TutorialBrief} from "../../client/generated";

export interface NameCardProps {
	tutorial: TutorialBrief
}

export const NameCard = (props: NameCardProps) => {
  const {tutorial} = props;

	return (
		<div className="name-card">

		</div>
  )
}
