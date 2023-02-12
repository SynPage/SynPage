import {Step, Tutorial} from "../client/generated";

export interface SessionState {
	tutorial?: Tutorial,
	stepIndex?: number,
	step?: Step,
	[key: string]: any
}

export interface IStorageService {
	set(state: SessionState): Promise<void>;

	get(items: string[]): Promise<SessionState>;

	clear(): Promise<void>;
}

export class StorageService implements IStorageService {
	constructor(protected id: string) {

	}

	set(state: SessionState): Promise<void> {
		return chrome.storage.session.set(this.decorateState(state));
	}

	get(items: string[]): Promise<SessionState> {
		return chrome.storage.session.get(items.map(item => this.decorateStateItem(item)));
	}

	clear(): Promise<void> {
		return chrome.storage.session.clear();
	}

	protected decorateStateItem(item: string): string {
		return item; // TODO: Find out why appending id to this item does not work.
	}

	protected decorateState(state: SessionState): any {
		return Object.keys(state).reduce((acc, key) => {
			acc[this.decorateStateItem(key)] = state[key];
			return acc;
		}, {} as {[k: string]: any})
	}
}
