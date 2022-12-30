import {ChromeQuery, validateQuery} from "../../chrome/query";
import {ChromeResponse, Status} from "../../chrome/response";
import {OnPageClient} from "../../chrome/onPageClient";

export class MockOnPageClient extends OnPageClient {
  override async query(query: ChromeQuery): Promise<ChromeResponse> {
    return {
      query: query,
      status: Status.ok,
    };
  }

  override listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {

  }
}