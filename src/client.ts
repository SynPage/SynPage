import {StepsApi, TutorialBrief, TutorialsApi} from "./generated";
import {getCurrentTab} from "./Popup/chrome/utils";

const basePath = "http://localhost:8000";

const tutorialsApi = new TutorialsApi(undefined, basePath);
const stepsApi = new StepsApi(undefined, basePath);

export const loadTutorialsForCurrentTab = async () => {
  // const tab = await getCurrentTab();
  // if (!tab || !tab.url) {
  //   throw new Error("Failed to get active tab.");
  // }
  // TODO: Api should allow filtering on target_site
  return (await tutorialsApi.listTutorials()).data.results;
}

export const retrieveTutorial = async (id: number) => {
  return await tutorialsApi.retrieveTutorial(id.toString());
}

export const sendTutorialToPage = async (tutorial: TutorialBrief) => {
  const tab = await getCurrentTab();
  if (!tab || !tab.id) {
    throw new Error("No active tab found.");
  }
  return await chrome.tabs.sendMessage(tab.id, tutorial);
}