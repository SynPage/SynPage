import {ChromeResponse, Status} from "./response";
import {IMessageHandler} from "./IMessageHandler";
import {ChromeQuery, validateQuery} from "./query";

export interface IMessageService {
	registerMessageHandler(handler: IMessageHandler): void;

	registerExternalMessageHandler(handler: IMessageHandler): void;
}

export class MessageService implements IMessageService {
	messageHandlers: IMessageHandler[];
	externalMessageHandlers: IMessageHandler[];

	constructor() {
		this.messageHandlers = [];
		this.externalMessageHandlers = [];
		chrome.runtime.onMessage.addListener((message, sender, sendResponse): boolean => {
			console.log("[Background]: Received message", message);
			this.handleChromeQuery(message, sender, sendResponse, this.messageHandlers);

			// !!! Important, returning true indicates that you want to send the response asynchronously
			return true;
		});
		chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse): boolean => {
			this.handleChromeQuery(message, sender, sendResponse, this.externalMessageHandlers);

			// !!! Important, returning true indicates that you want to send the response asynchronously
			return true;
		});
	}

	registerMessageHandler(handler: IMessageHandler) {
		this.messageHandlers.push(handler);
	}

	registerExternalMessageHandler(handler: IMessageHandler) {
		this.externalMessageHandlers.push(handler);
	}

	protected async handleChromeQuery(query: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void, handlers: IMessageHandler[]): Promise<void> {
		const {valid, validated} = validateQuery(query);

		if (valid) {
			const responses: string[] = [];
			const errors: string[] = [];
			await Promise.all(handlers.map(async handler => {
				if (handler.messageTypes.findIndex(type => validated.type === type) !== -1) {
					try {
						const {status, message} = await handler.handleMessage(validated.message, sender);
						if (status === Status.ok) {
							responses.push(message);
						} else {
							errors.push(message);
						}
					} catch (e: any) {
						errors.push(e.message);
					}
				}
			}));
			if (responses.length > 0) {
				sendResponse(this.constructResponse(validated, Status.ok, responses[0])); // TODO: Should we return all responses?
			} else if (errors.length > 0) {
				sendResponse(this.constructErrorResponse(validated, errors[0]));
			}
		} else {
			sendResponse(this.constructErrorResponse(validated, "Invalid query."));
		}
	}

	protected constructResponse(query: ChromeQuery, status: Status, message?: string) : ChromeResponse {
		return {
			query: query,
			status: status,
			message: message
		}
	}

	protected constructErrorResponse(query: ChromeQuery, message?: string) : ChromeResponse {
		return this.constructResponse(query, Status.error, message);
	}
}
