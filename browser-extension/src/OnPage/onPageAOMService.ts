import {IAOMService} from "../services/IAOMService";
import {OnPageClient} from "../chrome/onPageClient";
import {QueryType} from "../chrome/query";

export class OnPageAOMService implements IAOMService {
	public constructor(protected client: OnPageClient) {
	}
	getAccessibilityNode(locator: string): Promise<number> {
		throw new Error("Not implemented.")
	}

	async getNodeSelector(locator: string): Promise<string> {
		const response = await this.client.query({type: QueryType.accessibility, message: {locator: locator}});
		return response.message;
	}
}
