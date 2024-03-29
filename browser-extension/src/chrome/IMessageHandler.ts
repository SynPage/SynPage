import {QueryType} from "./query";
import {Status} from "./response";

export abstract class IMessageHandler {
	protected constructor(public messageTypes: QueryType[]) {
	}

	public abstract handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{status: Status, message?: any}>;
}
