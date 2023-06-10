import CDP from 'chrome-remote-interface'
import ProtocolProxyApi from 'devtools-protocol/types/protocol-proxy-api'
import AccessibilityApi = ProtocolProxyApi.AccessibilityApi
import { IAIService } from '../ai/AIService'
import Protocol from 'devtools-protocol'
import AXNode = Protocol.Accessibility.AXNode
import Runtime = Protocol.Runtime
import { IAOMService } from '../services/IAOMService'

export class BackgroundAOMService implements IAOMService {
  public constructor(protected aiService: IAIService, public tabId: number) {}

  public attach() {
    if (this.tabId == -1) {
      throw new Error('Specify tabId before using.')
    }
    chrome.debugger.attach({ tabId: this.tabId }, '1.0', () => {
      console.log('Attached')
    })
  }

  public async getAccessibilityNode(locator: string) {
    await this.attach()
    const result: any = await chrome.debugger.sendCommand(
      { tabId: this.tabId },
      'Accessibility.getFullAXTree',
    )
    const nodes = result.nodes as AXNode[]
    console.log('getFullAXTree', nodes)
    const processed = nodes
      .filter((node) => {
        const role = node.role?.value
        const name = node.name?.value
        if (
          role !== undefined &&
          role !== 'none' &&
          role !== 'StaticText' &&
          role !== 'generic' &&
          role !== 'tooltip' &&
          role !== 'region' &&
          name !== undefined
        ) {
          return true
        }
      })
      .map((node) => {
        return {
          id: node.backendDOMNodeId ?? -1,
          description: `${node.role?.value ?? ''} ${node.name?.value ?? ''}`,
        }
      })
    console.log('processed', processed)
    const node = await this.aiService.findDescriptionTarget(locator, processed)
    if (!node) {
      throw new Error('Could not find node')
    }
    const nodeId = node.id
    console.log('findDescriptionTarget', node)
    return nodeId
  }

  public async getNodeSelector(locator: string): Promise<string> {
    await this.attach()
    let nodeId
    try {
      nodeId = await this.getAccessibilityNode(locator)
    } catch (e) {
      console.log(e)
      return ''
    }
    const result: any = await chrome.debugger.sendCommand(
      { tabId: this.tabId },
      'DOM.resolveNode',
      {
        backendNodeId: nodeId,
      },
    )
    const node = result.object as Runtime.RemoteObject
    console.log('resolveNode', node)
    return node.description ?? ''
  }
}
