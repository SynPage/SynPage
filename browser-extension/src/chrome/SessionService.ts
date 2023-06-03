import {Session} from "./session";
import {StorageService} from "./StorageService";

export interface ISessionService {
	getOrCreateSession(host: string): Session;
	getDefaultSession(): Session;
}

export class SessionService implements ISessionService {
	public constructor() {
		this.sessions.set("", new Session("", new StorageService("")))
	}
	public sessions: Map<string, Session> = new Map();
	getOrCreateSession(host: string): Session {
		let session = this.sessions.get(host);
		if (!session) {
			console.log("[Background.SessionService]: Created new session with host", host);
			session = new Session(host, new StorageService(host))
			this.sessions.set(host, session);
		}
		return session;
	}

	getDefaultSession(): Session {
		return this.getOrCreateSession("");
	}
}
