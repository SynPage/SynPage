import {TutorialsApi, StepsApi, TextboxApi} from "./generated";

const basePath = process.env.REACT_APP_API_BASE;

const tutorialsApi = new TutorialsApi(undefined, basePath);
const stepsApi = new StepsApi(undefined, basePath);
const textBoxesApi = new TextboxApi(undefined, basePath);

export {tutorialsApi, stepsApi, textBoxesApi}