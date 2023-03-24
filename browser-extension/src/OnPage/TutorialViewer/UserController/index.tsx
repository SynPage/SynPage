import {SidePanel} from "./SidePanel";
import {Step, Tutorial} from "../../../client/generated";
import {ActionCentre} from "./ActionCentre";

export interface UserControllerProps {
	tutorial: Tutorial,
}

export const UserController = (props: UserControllerProps) => {
	const {tutorial} = props;

	return (
		<div className={"user-controller"}>

		</div>
	)
}
