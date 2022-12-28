import {MockPopupClient} from "./mockPopupClient";
import {MockOnPageClient} from "./mockOnPageClient";

const BASE_PATH = process.env.API_BASE_URL;

export const mockPopupClient = new MockPopupClient();
export const mockOnPageClient = new MockOnPageClient();

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