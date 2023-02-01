import {SidePanel} from "./SidePanel";
import {Step, Tutorial} from "../../../client/generated";
import {ToolTip} from "./ToolTip";

export interface UserControllerProps {
	tutorial: Tutorial,
	step?: Step
}

export const UserController = (props: UserControllerProps) => {
	const {tutorial, step} = props;

	return (
		<div className={"user-controller"}>
			<ToolTip/>
			<SidePanel tutorial={tutorial} step={step}/>
		</div>
	)
}
