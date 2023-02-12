import {ChromeQuery, QueryType} from "../chrome/query";

export class ExtensionService {
	public openTutorial(tutorialId: string) {
		const extensionId = process.env.REACT_APP_EXTENSION_ID;
		if (!extensionId) {
			throw new Error("Could not load extension id.");
		}
		const message: ChromeQuery = {
			type: QueryType.init,
			message: tutorialId
		}
		chrome.runtime.sendMessage(extensionId, message, response => {
			console.log(response);
		});
	}
}
