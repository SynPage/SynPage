import {SidePanel} from "./SidePanel";
import {Step, Tutorial} from "../../../client/generated";
import {ActionCentre} from "./ActionCentre";

export interface UserControllerProps {
	tutorial: Tutorial,
	step?: Step
}

export const UserController = (props: UserControllerProps) => {
	const {tutorial, step} = props;

	return (
		<div className={"user-controller"}>
			<ActionCentre/>
			<SidePanel tutorial={tutorial} step={step}/>
		</div>
	)
}
