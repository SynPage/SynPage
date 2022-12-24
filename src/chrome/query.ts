export enum QueryType {
  tutorialInit,
  exitTutorial
}

export interface ChromeQuery {
  type: QueryType
  message: any
}

export const validateQuery = (query: ChromeQuery) => {
  return {valid: true, validated: query};
}