import {ActionsApi, Configuration, DefaultConfig, HTTPQuery, StepsApi, TutorialsApi} from "./generated";

const BASE_PATH = process.env.REACT_APP_API_BASE_URL;

const config = new Configuration({
  basePath: BASE_PATH
})

const tutorialsApi = new TutorialsApi(config);
const stepsApi = new StepsApi(config);
const actionsApi = new ActionsApi(config);

export {
  tutorialsApi,
  stepsApi,
  actionsApi
}
