import {IMessageHandler} from "../chrome/IMessageHandler";
import {QueryType} from "../chrome/query";
import {Status} from "../chrome/response";
import {IAOMService} from "../services/IAOMService";
import {BackgroundAOMService} from "./BackgroundAOMService";

export class AOMHandler extends IMessageHandler {
	constructor(protected automationService: BackgroundAOMService) {
		super([QueryType.accessibility]);
	}

	async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		console.log("AOM: message", message);
		if (!sender.tab?.id) {
			return {
				status: Status.error,
				message: "Sender information missing."
			}
		}

		this.automationService.tabId = sender.tab.id;

		try {
			const selector = await this.automationService.getNodeSelector(message?.locator);
			return {
				status: Status.ok,
				message: selector
			}
		} catch (e) {
			console.log("AOMHandler failed", e);
			return {
				status: Status.error,
				message: e
			}
		}
	}
}
