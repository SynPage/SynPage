import {MessageService} from "./chrome/MessageService";
import {BackgroundApp} from "./background/BackgroundApp";
import {SessionService} from "./chrome/SessionService";
import {AutomationService} from "./chrome/AutomationService";

const app = new BackgroundApp(new MessageService(), new SessionService(), new AutomationService());
