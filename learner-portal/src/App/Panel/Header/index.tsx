import {Search} from "./Search";
import {Profile} from "./Profile";

export const Header = () => {
	return (
		<div className="header">
			<Search/>
			<Profile/>
		</div>
	)
}
