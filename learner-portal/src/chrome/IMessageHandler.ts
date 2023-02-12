import {QueryType} from "./query";
import {Status} from "./response";

export abstract class IMessageHandler {
	protected constructor(public messageType: QueryType) {
	}

	public abstract handleMessage(message: any): Promise<{status: Status, message?: any}>;
}
