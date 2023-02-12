import {IMessageHandler} from "../chrome/IMessageHandler";
import {Status} from "../chrome/response";
import {StepsApi} from "../client/generated";
import {QueryType} from "../chrome/query";
import {ISessionService} from "../chrome/SessionService";

export class RequestStepHandler extends IMessageHandler {
	constructor(protected stepsApi: StepsApi, protected sessionService: ISessionService) {
		super([QueryType.requestStep]);
	}

	override async handleMessage(message: any, senderHost: string): Promise<{ status: Status; message?: any }> {
		const storageService = this.sessionService.getOrCreateSession(senderHost).storageService;
		console.log(this.sessionService);
		let {stepIndex, step, tutorial} = await storageService.get(["stepIndex", "step", "tutorial"]);
		console.log(stepIndex, step, tutorial);
		const errorResponse = {
			status: Status.error,
			message: "[Background]: lost current step information."
		}

		if (stepIndex !== undefined && tutorial !== undefined && tutorial.steps !== undefined) {
			const stepId = tutorial.steps[stepIndex].id;
			if (stepId === undefined) {
				return errorResponse;
			}
			if (step === undefined || step.index !== stepIndex) {
				step = await this.stepsApi.retrieveStep({id: stepId.toString()});
				console.log("[Background]: Retrieved step", step);
				await storageService.set({step: step});
			}

			return {
				status: Status.ok,
				message: step
			}
		}
		return errorResponse;
	}
}

export class SetStepHandler extends IMessageHandler {
	constructor(protected sessionService: ISessionService) {
		super([QueryType.setStepIndex]);
	}

	override async handleMessage(message: any, senderHost: string): Promise<{ status: Status; message?: any }> {
		const storageService = this.sessionService.getOrCreateSession(senderHost).storageService;
		await storageService.set({stepIndex: message});
		const {stepIndex} = await storageService.get(["stepIndex"]);
		return {
			status: Status.ok,
			message: stepIndex
		}
	}
}
