import {ChromeQuery, QueryType} from "../../chrome/query";
import {ChromeResponse} from "../../chrome/response";
import {OnPageClient} from "../../chrome/onPageClient";
import {Step, TutorialBrief} from "../../client/generated";

export class MockOnPageClient extends OnPageClient {
  override async requestStep(): Promise<Step> {
    return {
      title: "Step Demo",
      description: "Demo description",
      index: 0,
      tutorialId: 0,
      actions: []
    };
  }

  override async requestStepIndexChange(newStepIndex: number): Promise<number> {
    return 0;
  }

  override async notifyExit(): Promise<void> {

  }

  override async resumeTutorial(): Promise<TutorialBrief> {
    return {
      "id": 1,
      "title": "Hello World",
      "description": "",
      targetSite: "http://127.0.0.1:8000/tutorials/",
      steps: [
        {
          title: "Step Demo",
          index: 0
        }
      ]
    };
  }

  override listen(
    onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
    onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {

  }
}