import {ChromeQuery, QueryType} from "../../chrome/query";
import {ChromeResponse} from "../../chrome/response";
import {OnPageClient} from "../../chrome/onPageClient";
import {Step, Tutorial, TutorialInfo} from "../../client/generated";
import {mockSteps, mockTutorial} from "./mockServices";

export class MockOnPageClient extends OnPageClient {
  index: number = 0;
  override async requestStepIndexChange(index: number): Promise<number> {
    this.index = index;
    return index;
  }

  override async requestStep(): Promise<Step> {
    return mockSteps[this.index];
  }

  override async notifyExit(): Promise<void> {

  }

  override async getOnGoingTutorial(): Promise<Tutorial> {
    return mockTutorial;
  }

  override listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {

  }
}
