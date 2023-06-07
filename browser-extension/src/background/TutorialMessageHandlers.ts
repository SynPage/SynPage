import {IMessageHandler} from "../chrome/IMessageHandler";
import {ChromeQuery, QueryType} from "../chrome/query";
import {Status} from "../chrome/response";
import {getCurrentTab} from "../chrome/utils";
import {Tutorial, TutorialsApi} from "../client/generated";
import {ISessionService} from "../chrome/SessionService";
import {IAIService} from "../ai/AIService";
import {tutorialsApi} from "../client";

const handleTutorialInitialization = async (tutorial: Tutorial, sessionService: ISessionService): Promise<void> => {
	console.log("[Background]: Saving tutorial", tutorial);
	await sessionService.getDefaultSession().storageService.set({tutorial: tutorial, stepIndex: 0});
	await notifyContent({type: QueryType.init, message: tutorial});
}

const notifyContent = async (query: ChromeQuery) => {
	const tab = await getCurrentTab();
	if (!tab || !tab.id) {
		console.log("[Background]: Failed to reach content script, active tab not found", tab, query);
	} else {
		console.log(`[Background]: Sending query`, query, ` to tab`, tab);
		await chrome.tabs.sendMessage(tab.id, query);
	}
}

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
		await handleTutorialInitialization(tutorial, this.sessionService);

		return {
			status: Status.ok
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
		const {tutorial, stepIndex} = await this.sessionService.getDefaultSession().storageService.get(["tutorial", "stepIndex"]);
		let status = Status.ok;
		if (!tutorial) {
			status = Status.error;
		}
		return {
			status: status,
			message: {
				tutorial: tutorial,
				stepIndex: stepIndex
			}
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
	constructor(protected tutorialsApi: TutorialsApi, protected sessionService: ISessionService) {
		super([QueryType.generate]);
	}

	override async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		try {
			const {question, context} = message;
			const prompt = `${context}
			---
			Based on the above context, ${question}
			`;
			// const currentPage = await getCurrentTab();
			// if (currentPage && currentPage.url) {
			// 	prompt += ` Answer in the context of ${currentPage.url}.`
			// }

			console.log("Generating tutorial", message);
			const tutorial = await tutorialsApi.tutorialsGenerateCreate({question: prompt});
			console.log("Generated tutorial", tutorial);

			await handleTutorialInitialization(tutorial, this.sessionService);

			return {
				status: Status.ok,
				message: tutorial
			}
		} catch (e) {
			console.log("Failed to generate tutorial", e);
			return {
				status: Status.error,
				message: e
			}
		}
	}
}
