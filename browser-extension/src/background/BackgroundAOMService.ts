import CDP from "chrome-remote-interface"
import ProtocolProxyApi from "devtools-protocol/types/protocol-proxy-api";
import AccessibilityApi = ProtocolProxyApi.AccessibilityApi;
import {IAIService} from "../ai/AIService";
import Protocol from "devtools-protocol";
import AXNode = Protocol.Accessibility.AXNode;
import Runtime = Protocol.Runtime;
import {IAOMService} from "../services/IAOMService";

export class BackgroundAOMService implements IAOMService {
	public constructor(protected aiService: IAIService, public tabId: number) {
	}

	public attach() {
		if (this.tabId == -1) {
			throw new Error("Specify tabId before using.")
		}
		chrome.debugger.attach({tabId: this.tabId}, "1.0", () => {
			console.log("Attached");
		})
	}

	public async getAccessibilityNode(locator: string) {
		await this.attach();
		const result: any = await chrome.debugger.sendCommand({tabId: this.tabId}, "Accessibility.getFullAXTree");
		let nodes = result.nodes as AXNode[];
		console.log("getFullAXTree", nodes);
		nodes = nodes.filter(node => node.role?.value == 'textbox');
		console.log("nodes", nodes);
		const processed = nodes.map(axnode => {
			return {id: axnode.backendDOMNodeId ?? -1, description: axnode.name?.value}
		});
		const node = await this.aiService.findDescriptionTarget(locator, processed);
		const nodeId = node.id;
		console.log("findDescriptionTarget", node);
		return nodeId;
	}

	public async getNodeSelector(locator: string): Promise<string> {
		await this.attach();
		const nodeId = await this.getAccessibilityNode(locator);
		const result: any = await chrome.debugger.sendCommand({tabId: this.tabId}, "DOM.resolveNode", {
			backendNodeId: nodeId
		});
		const node = result.object as Runtime.RemoteObject;
		console.log("resolveNode", node);
		return node.description ?? "";
	}
}
