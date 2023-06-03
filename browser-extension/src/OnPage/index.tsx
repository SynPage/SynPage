import {OnPageClient} from "../chrome/onPageClient";
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./store";

export interface OnPageProps {
	chromeClient: OnPageClient
}

export const OnPage = (props: OnPageProps) => {
	return (
		<Provider store={store}>
			<App {...props}/>
		</Provider>
	);
};
