import {ChromeResponse} from "./response";
import {ChromeQuery, validateQuery} from "./query";

export class PopupClient {
  queryBackground(query: ChromeQuery): Promise<ChromeResponse> {
    return chrome.runtime.sendMessage(query);
  }
}

export default new PopupClient();