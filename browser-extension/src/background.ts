import {MessageService} from "./chrome/MessageService";
import {BackgroundApp} from "./background/BackgroundApp";
import {SessionService} from "./chrome/SessionService";
import {BackgroundAOMService} from "./background/BackgroundAOMService";
import {AIService} from "./ai/AIService";

const aiService = new AIService();
const messageService = new MessageService();
const sessionService = new SessionService();
const aomService = new BackgroundAOMService(aiService, -1);
const app = new BackgroundApp(aiService, messageService, sessionService, aomService);
