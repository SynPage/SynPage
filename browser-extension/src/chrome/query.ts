export enum QueryType {
  "init",
  "exit",
  "requestStep",
  "setStepIndex",
  "resumeTutorial",
  "exception"
}

export interface ChromeQuery {
  type: QueryType,
  message?: any
}

export const validateQuery = (query: ChromeQuery) => {
  if ((query === undefined) || (query.type === undefined)) {
    return {valid: false, validated: {type: QueryType.exception, message: "Invalid query."}}
  }
  return {valid: true, validated: query};
}