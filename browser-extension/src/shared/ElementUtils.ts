import {OnPageClient} from "../chrome/onPageClient";
import {QueryType} from "../chrome/query";

export class ElementUtils {
	static getNodeSelectorByDescription = async (description: string, chromeClient?: OnPageClient): Promise<string> => {
		if (!chromeClient) {
			chromeClient = new OnPageClient();
		}
		const response = await chromeClient.query({type: QueryType.accessibility, message: {locator: description}});
		console.log(response);
		return response.message;
	}
}
