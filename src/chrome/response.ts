import {ChromeQuery} from "./query";

export enum Status {
  "ok",
  "error"
}

export interface ChromeResponse {
  query: ChromeQuery
  status: Status
  message?: any
}

export const validateResponse = (response: ChromeResponse): {valid: boolean, validated: ChromeResponse} => {
  if (response === undefined || response.status === undefined) {
    return {
      valid: false,
      validated: {
        ...response,
        status: Status.error,
        message: "Invalid response."
      }
    }
  }

  return {
    valid: true,
    validated: response
  };
}