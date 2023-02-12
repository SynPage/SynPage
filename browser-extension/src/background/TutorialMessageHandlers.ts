import {IMessageHandler} from "../chrome/IMessageHandler";
import {ChromeQuery, QueryType} from "../chrome/query";
import {Status} from "../chrome/response";
import {getCurrentTab} from "../chrome/utils";
import {TutorialsApi} from "../client/generated";
import {IStorageService} from "../chrome/StorageService";
import {ISessionService} from "../chrome/SessionService";
import {Session} from "../chrome/session";

export class TutorialInitializationHandler extends IMessageHandler {
	constructor(protected tutorialsApi: TutorialsApi, protected sessionService: ISessionService) {
		super([QueryType.init]);
	}
	override async handleMessage(message: any, senderHost: string) {
		const id: string = message;
		const tutorial = await this.tutorialsApi.retrieveTutorial({id: id});
		const targetHost = new URL(tutorial.targetSite).host;
		const currentTab = await getCurrentTab();
		const currentPageHost = new URL(currentTab.url ?? "").host;
		console.log(targetHost, currentPageHost);
		if (targetHost !== currentPageHost) {
			await chrome.tabs.create({url: tutorial.targetSite});
		}
		console.log("[Background]: Saving tutorial", tutorial);
		await this.sessionService.getOrCreateSession(targetHost).storageService.set({tutorial: tutorial, stepIndex: 0});
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
	override async handleMessage(message: any, senderHost: string): Promise<{ status: Status; message?: any }> {
		const {tutorial} = await this.sessionService.getOrCreateSession(senderHost).storageService.get(["tutorial"]);
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
	override async handleMessage(message: any, senderHost: string): Promise<{ status: Status; message?: any }> {
		await this.sessionService.getOrCreateSession(senderHost).storageService.clear();
		return {
			status: Status.ok
		}
	}
}
