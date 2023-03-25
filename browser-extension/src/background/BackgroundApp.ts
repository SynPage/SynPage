import {IMessageService} from "../chrome/MessageService";
import {
	TutorialExitHandler,
	TutorialFromAIHandler,
	TutorialInitializationHandler,
	TutorialResumptionHandler
} from "./TutorialMessageHandlers";
import {stepsApi, tutorialsApi} from "../client";
import {SetStepHandler} from "./StepMessageHandlers";
import {ISessionService} from "../chrome/SessionService";
import {AOMHandler} from "./AutomationMessageHandlers";
import {IAIService} from "../ai/AIService";
import {IAOMService} from "../services/IAOMService";
import {BackgroundAOMService} from "./BackgroundAOMService";

export class BackgroundApp {
	constructor(
		protected aiService: IAIService,
		protected messageService: IMessageService,
		protected sessionService: ISessionService,
		protected aomService: BackgroundAOMService
	) {
		messageService.registerMessageHandler(new TutorialInitializationHandler(tutorialsApi, sessionService));
		messageService.registerMessageHandler(new TutorialResumptionHandler(sessionService));
		messageService.registerMessageHandler(new TutorialExitHandler(sessionService));
		// messageService.registerMessageHandler(new RequestStepHandler(stepsApi, sessionService));
		messageService.registerMessageHandler(new SetStepHandler(sessionService));
		messageService.registerMessageHandler(new AOMHandler(aomService));
		messageService.registerMessageHandler(new TutorialFromAIHandler(tutorialsApi, sessionService));
		messageService.registerExternalMessageHandler(new TutorialInitializationHandler(tutorialsApi, sessionService));
	}
}
