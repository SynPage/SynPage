import {ChromeResponse, Status, validateResponse} from "./response";
import {ChromeQuery, QueryType, validateQuery} from "./query";
import {Step, Tutorial} from "../client/generated";

export class OnPageClient {
  private async query(query: ChromeQuery): Promise<ChromeResponse> {
    console.log("[Content]: Sending query", query);
    const response = await chrome.runtime.sendMessage(query);
    const {valid, validated} = validateResponse(response);
    if (!valid || validated.status !== Status.ok) {
      throw new Error("[Content]: error occurred while querying the background script.", validated.message);
    }
    return validated;
  }

  async requestStep(): Promise<Step> {
    const response = await this.query({type: QueryType.requestStep});
    // TODO: Think about when and how it will happen where the requested stepIndex defers from the one returned (actual)
    return response.message;
  }

  async requestStepIndexChange(newStepIndex: number): Promise<number> {
    const response = await  this.query({type: QueryType.setStepIndex, message: newStepIndex});
    return response.message;
  }

  async notifyExit(): Promise<void> {
    await this.query({type: QueryType.exit});
  }

  async getOnGoingTutorial(): Promise<Tutorial> {
    const response = await this.query({type: QueryType.resumeTutorial});
    return response.message;
  }

  listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {
    console.log("[Content]: Registering onPage listener.")
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('[Content]: Message received', {
          message,
          sender,
        });
        const {valid, validated} = validateQuery(message);
        if (!valid) {
          onError(validated, "[Content]: Received unexpected message.").then(sendResponse);
        } else {
          onSuccess(validated).then(sendResponse);
        }

        return true;
      }
    )
  }
}
