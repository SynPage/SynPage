import {TutorialsApi, StepsApi, TextboxApi} from "./generated";

const basePath = "http://127.0.0.1:8000"

const tutorialsApi = new TutorialsApi(undefined, basePath);
const stepsApi = new StepsApi(undefined, basePath);
const textBoxesApi = new TextboxApi(undefined, basePath);

export {tutorialsApi, stepsApi, textBoxesApi}