import {ChromeQuery} from "./query";

export enum Status {
  ok,
  error
}

export interface ChromeResponse {
  query: ChromeQuery
  status: Status
  message?: string
}

export const validateResponse = (response: ChromeResponse) => {
  if (!(response.query !== undefined && response.status !== undefined)) {
    return {
      valid: false,
      validated: response
    }
  }

  return {
    valid: true,
    validated: response
  };
}