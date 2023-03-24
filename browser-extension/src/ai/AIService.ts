import {Configuration, CreateChatCompletionRequest, OpenAIApi} from "openai";
import {Tutorial, TutorialFromJSON} from "../client/generated";
import {ChatCompletionRequestMessage} from "openai/api";

export interface IAIService {
	findDescriptionTarget<T extends IdentifiableNode>(description: any, objects: T[]): Promise<T>;

	askAI(question: string): Promise<Tutorial>;
}

interface IdentifiableNode {
	id: number | string
	description: string
}

export class AIService implements IAIService {
	protected openai: OpenAIApi

	public constructor() {
		const configuration = new Configuration({
			apiKey: process.env.REACT_APP_OPENAI_API_KEY
		})
		this.openai = new OpenAIApi(configuration)
	}

	async findDescriptionTarget<T extends IdentifiableNode>(description: any, objects: T[]): Promise<T> {
		console.log("finding target", description, objects)
		const response = await fetch('http://localhost:7071/api/GetMatchingNode', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nodes: objects.map(object => object.description),
				description: description
			})
		});
		const matchingDescription = await response.text();
		console.log("found target", response, matchingDescription);
		return objects.find(o => o.description === matchingDescription)!;
	}

	async askAI(question: string): Promise<Tutorial> {
		const request = this.prepareRequest(question);
		console.log("Querying OpenAI with", request);
		const rawResponse = await fetch("https://api.openai.com/v1/chat/completions", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
			},
			body: JSON.stringify(request)
		});
		const response = await rawResponse.json();
		// const response = await this.openai.createChatCompletion(request);
		console.log("OpenAI response", response);
		const rawTutorial: string = response.choices[0].message?.content;
		if (!rawTutorial) {
			throw new Error("OpenAI no response");
		}
		const regex = /{.*}/s;
		const jsonMatches = rawTutorial.match(regex);
		if (!jsonMatches) {
			throw new Error("Response from OpenAI does not contain a json object.");
		}
		const tutorial = TutorialFromJSON(JSON.parse(jsonMatches[0]));
		return tutorial;
	}

	protected prepareRequest(question: string): CreateChatCompletionRequest {
		const messages: ChatCompletionRequestMessage[] = []
		messages.push(this.createTutorialGenerationSystemMessage());
		messages.push({
			role: "user",
			content: question
		});
		const model = process.env.REACT_APP_OPENAI_API_CHAT_MODEL;
		if (!model) {
			throw new Error("OpenAI chat model not defined.");
		}
		return {
			model: model,
			messages: messages
		}
	}

	protected createTutorialGenerationSystemMessage(): ChatCompletionRequestMessage {
		return {
			role: "system",
			content: `You are a reliable assistant that answer user's question in tutorial format. Important: provide your answer in json, include nothing else. The tutorial is defined as following typescript interfaces. \\nenum ActionType {\\n  LeftClick = 'left click',\\n  RightClick = 'right click',\\n  LeftDoubleClick = 'left double click',\\n  RightDoubleClick = 'right double click',\\n  Enter = 'enter',\\n  ScrollDown = 'scroll down',\\n  ScrollUp = 'scroll up',\\n}\\n\\ninterface Action {\\n  target_element: string;\\n  action_type: ActionType;\\n  content?: string;\\n}\\n\\ninterface Step {\\n  title: string;\\n  description: string;\\n  actions: Action[];\\n}\\n\\ninterface Tutorial {\\n  title: string;\\n  description: string;\\n  steps: Step[];\\n}\\nAnswer user's questions in the context of web apps.`
		};
	}
}
