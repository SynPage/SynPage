import {IMessageService} from "../chrome/MessageService";
import {TutorialExitHandler, TutorialInitializationHandler, TutorialResumptionHandler} from "./TutorialMessageHandlers";
import {stepsApi, tutorialsApi} from "../client";
import {RequestStepHandler, SetStepHandler} from "./StepMessageHandlers";
import {ISessionService} from "../chrome/SessionService";
import {IAutomationService} from "../chrome/AutomationService";

export class BackgroundApp {
	constructor(
		protected messageService: IMessageService,
		protected sessionService: ISessionService,
		protected automationService: IAutomationService
	) {
		messageService.registerMessageHandler(new TutorialInitializationHandler(tutorialsApi, sessionService));
		messageService.registerMessageHandler(new TutorialResumptionHandler(sessionService));
		messageService.registerMessageHandler(new TutorialExitHandler(sessionService));
		messageService.registerMessageHandler(new RequestStepHandler(stepsApi, sessionService));
		messageService.registerMessageHandler(new SetStepHandler(sessionService));
		messageService.registerExternalMessageHandler(new TutorialInitializationHandler(tutorialsApi, sessionService));
		automationService.getAccessibilityNode("");
	}
}
