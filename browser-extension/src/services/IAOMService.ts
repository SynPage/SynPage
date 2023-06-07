export interface IAOMService {
	getAccessibilityNode(locator: string): Promise<number>;
	getNodeSelector(locator: string): Promise<string>;
}
