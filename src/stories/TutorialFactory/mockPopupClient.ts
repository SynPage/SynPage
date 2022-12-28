import {PopupClient} from "../../chrome/popupClient";
import {ChromeQuery} from "../../chrome/query";
import {ChromeResponse, Status} from "../../chrome/response";

export class MockPopupClient extends PopupClient {
  triggerSuccess?: (query: ChromeQuery) => Promise<ChromeResponse>;
  triggerError?: (query: ChromeQuery, message: string) => Promise<ChromeResponse>;

  override async queryBackground(query: ChromeQuery): Promise<ChromeResponse>{
    console.log("Mock sending query: ");
    console.log(query);
    return {
      query: query,
      status: Status.ok,
    };
  }

  // listen = async (onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
  //                 onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>) => {
  //   this.triggerSuccess = onSuccess;
  //   this.triggerError = onError;
  //   console.log("Mock Listening...");
  // }
}