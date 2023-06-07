import {IMessageHandler} from "../chrome/IMessageHandler";
import {Status} from "../chrome/response";
import {StepsApi} from "../client/generated";
import {QueryType} from "../chrome/query";
import {ISessionService} from "../chrome/SessionService";

// export class RequestStepHandler extends IMessageHandler {
// 	constructor(protected stepsApi: StepsApi, protected sessionService: ISessionService) {
// 		super([QueryType.requestStep]);
// 	}
//
// 	override async handleMessage(stepIndex: number, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
// 		if (!sender.url) {
// 			return {
// 				status: Status.error,
// 				message: "Can not identify sender."
// 			}
// 		}
// 		const storageService = this.sessionService.getOrCreateSession(new URL(sender.url).host).storageService;
// 		let {tutorial, step} = await storageService.get(["tutorial", "step"]);
// 		const errorResponse = {
// 			status: Status.error,
// 			message: "[Background]: lost current step information."
// 		}
//
// 		if (stepIndex !== undefined && tutorial !== undefined && tutorial.steps !== undefined) {
// 			const stepId = tutorial.steps[stepIndex].id;
// 			if (stepId === undefined) {
// 				return errorResponse;
// 			}
// 			if (step === undefined || step.index !== stepIndex) {
// 				step = await this.stepsApi.stepsRetrieve({id: stepId});
// 				console.log("[Background]: Retrieved step", step);
// 				await storageService.set({step: step, stepIndex: stepIndex});
// 			}
//
// 			return {
// 				status: Status.ok,
// 				message: step
// 			}
// 		}
// 		return errorResponse;
// 	}
// }

export class SetStepHandler extends IMessageHandler {
	constructor(protected sessionService: ISessionService) {
		super([QueryType.setStepIndex]);
	}

	override async handleMessage(message: any, sender: chrome.runtime.MessageSender): Promise<{ status: Status; message?: any }> {
		if (!sender.url) {
			return {
				status: Status.error,
				message: "Can not identify sender."
			}
		}
		const storageService = this.sessionService.getDefaultSession().storageService;
		await storageService.set({stepIndex: message});
		const {stepIndex} = await storageService.get(["stepIndex"]);
		return {
			status: Status.ok,
			message: stepIndex
		}
	}
}
