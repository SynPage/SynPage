import {MessageService} from "./chrome/MessageService";
import {BackgroundApp} from "./background/BackgroundApp";
import {SessionService} from "./chrome/SessionService";

const app = new BackgroundApp(new MessageService(), new SessionService());
