import {ChromeClient} from "../../chrome/client";
import {ChromeResponse, Status} from "../../chrome/response";
import {actionsApi, stepsApi, tutorialsApi} from "../../client";
import {ChromeQuery} from "../../chrome/query";

const BASE_PATH = "http://localhost:8000"

export class MockChromeClient extends ChromeClient {
  triggerSuccess?: (query: ChromeQuery) => Promise<ChromeResponse>;
  triggerError?: (query: ChromeQuery, message: string) => Promise<ChromeResponse>;

  sendQuery = async (query: ChromeQuery): Promise<ChromeResponse> => {
    console.log("Mock sending query: ");
    console.log(query);
    return {
      query: query,
      status: Status.ok,
    };
  }

  listen = async (onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
                  onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>) => {
    this.triggerSuccess = onSuccess;
    this.triggerError = onError;
    console.log("Mock Listening...");
  }
}

const mockChromeClient = new MockChromeClient();

export default {
  chromeClient: mockChromeClient,
  tutorialsApi: tutorialsApi,
  stepsApi: stepsApi,
  actionsApi: actionsApi
}

export const mockData = [
  {
    url: `${BASE_PATH}/tutorials`,
    method: 'GET',
    status: 200,
    response: {
      "count": 2,
      "next": null,
      "previous": null,
      "results": [
        {
          "id": 1,
          "title": "Hello World",
          "description": "",
          "target_site": "http://127.0.0.1:8000/tutorials/"
        },
        {
          "id": 2,
          "title": "Tutorial 2",
          "description": "This is a description.",
          "target_site": "http://localhost:8000/tutorials/"
        }
      ]
    },
  },
  {
    url: `${BASE_PATH}/tutorials/1`,
    method: 'GET',
    status: 200,
    response: {
      "id": 1,
      "title": "Hello World",
      "description": "",
      "target_site": "http://127.0.0.1:8000/tutorials/",
      "steps": [
        {
          "id": 1,
          "title": "Step 1",
          "index": 0
        }
      ]
    },
  },
  {
    url: `${BASE_PATH}/tutorials/2`,
    method: 'GET',
    status: 200,
    response: {
      "id": 2,
      "title": "Tutorial 2",
      "description": "This is a description.",
      "target_site": "http://localhost:8000/tutorials/",
      "steps": []
    },
  },
]