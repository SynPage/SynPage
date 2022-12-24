import {ChromeResponse} from "./response";
import {ChromeQuery} from "./query";

export abstract class ChromeClient {
  abstract sendQuery(query: ChromeQuery): Promise<ChromeResponse>;

  abstract listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void;
}