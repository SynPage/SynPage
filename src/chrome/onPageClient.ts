import {ChromeResponse, validateResponse} from "./response";
import {ChromeQuery, validateQuery} from "./query";

export class OnPageClient {
  async query(query: ChromeQuery): Promise<ChromeResponse> {
    const response = await chrome.runtime.sendMessage(query);
    const {valid, validated} = validateResponse(response);
    if (!valid) {
      throw new Error("[Content]: received invalid response.");
    }
    return validated;
  }

  listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {
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

export default new OnPageClient();