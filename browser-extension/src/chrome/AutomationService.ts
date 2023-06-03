import {getCurrentTab} from "./utils";

export interface IAutomationService {
	getAccessibilityNode(locator: string): Promise<void>;
}

export class AutomationService implements IAutomationService {
	public async getAccessibilityNode(locator: string) {
		console.log(chrome);
		chrome.runtime.onInstalled.addListener(() => {
			chrome.debugger.sendCommand({tabId: tab.id}, "Accessibility.getFullAXTree", {}, function (result) {
				// do something with the result
				console.log(result);
			});
		})
		const tab = await chrome.tabs.create({url: "https://www.google.ca"});
		chrome.debugger.attach({tabId: tab.id}, "1.0", () => {
			console.log("Attached");
		})
	}
}
