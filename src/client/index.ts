import {ActionsApi, StepsApi, TutorialsApi} from "./generated";

const basePath = "http://localhost:8000";

const tutorialsApi = new TutorialsApi(undefined, basePath);
const stepsApi = new StepsApi(undefined, basePath);
const actionsApi = new ActionsApi(undefined, basePath);

export {
  tutorialsApi,
  stepsApi,
  actionsApi
}