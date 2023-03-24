import {IMessageHandler} from "../chrome/IMessageHandler";
import {ChromeQuery, QueryType} from "../chrome/query";
import {Status} from "../chrome/response";
import {getCurrentTab} from "../chrome/utils";
import {TutorialsApi} from "../client/generated";
import {ISessionService} from "../chrome/SessionService";
import {IAIService} from "../ai/AIService";

export class TutorialInitializationHandler extends IMessageHandler {
	constructor(protected tutorialsApi: TutorialsApi, protected sessionService: ISessionService) {
		super([QueryType.init]);
	}
	override async handleMessage(message: any, sender: chrome.runtime.MessageSender) {
		const id: number = message;
		const tutorial = await this.tutorialsApi.tutorialsRetrieve({id: id});
		// const targetHost = new URL(tutorial.targetSite).host;
		// const currentTab = await getCurrentTab();
		// console.log("Constructing URL", currentTab);
		// const currentPageHost = currentTab.url ? new URL(currentTab.url) : "";
		// if (targetHost !== currentPageHost) {
		// 	await chrome.tabs.create({url: tutorial.targetSite});
		// }
		console.log("[Background]: Saving tutorial", tutorial);
		await this.sessionService.getDefaultSession().storageService.set({tutorial: tutorial, stepIndex: 0});
		await this.notifyContent({type: QueryType.init, message: tutorial});

		return {
			status: Status.ok
		}
	}

	protected notifyContent = async (query: ChromeQuery) => {
		const tab = await getCurrentTab();
		if (!tab || !tab.id) {
			console.log("[Background]: Failed to reach content script, active tab not found", query);
		} else {
			console.log(`[Background]: Sending query`, query, ` to tab`, tab);
			await chrome.tabs.sendMessage(tab.id, query);
		}
	}
}

export class TutorialResumptionHandler extends IMessageHandler {
	constructor(protected sessionService: ISessionService) {
		super([QueryType.resumeTutorial]);
	}
	override async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		if (!sender.url) {
			return {
				status: Status.error,
				message: "Can not identify sender."
			}
		}
		const {tutorial} = await this.sessionService.getOrCreateSession(new URL(sender.url).host).storageService.get(["tutorial"]);
		let status = Status.ok;
		if (!tutorial) {
			status = Status.error;
		}
		return {
			status: status,
			message: tutorial
		}
	}
}

export class TutorialExitHandler extends IMessageHandler {
	constructor(protected sessionService: ISessionService) {
		super([QueryType.exit]);
	}
	override async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		if (!sender.url) {
			return {
				status: Status.error,
				message: "Can not identify sender."
			}
		}
		await this.sessionService.getOrCreateSession(new URL(sender.url).host).storageService.clear();
		return {
			status: Status.ok
		}
	}
}

export class TutorialFromAIHandler extends IMessageHandler {
	constructor(protected aiService: IAIService) {
		super([QueryType.generate]);
	}
	override async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		try {
			const tutorial = await this.aiService.askAI(message);
			console.log("Returning AI generated tutorial", tutorial);
			return {
				status: Status.ok,
				message: tutorial
			}
		} catch (e) {
			return {
				status: Status.error,
				message: e
			}
		}
	}
}
