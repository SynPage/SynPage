import {ChromeQuery, QueryType, validateQuery} from "./query";
import {ChromeResponse, Status} from "./response";
import {stepsApi, tutorialsApi} from "../client";
import {getCurrentTab} from "./utils";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background]: Message received', {
    message,
    sender,
  });
  handleMessage(message).then(
    sendResponse,
    reason => sendResponse({query: message, status: Status.error, message: reason.message})
  );

  // !!! Important, returning true indicates that you want to send the response asynchronously
  return true;
});

const handleMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
  const {valid, validated} = validateQuery(query);
  let response: ChromeResponse = {
    query: validated,
    status: Status.error
  }
  if (valid) {
    switch (validated.type) {
      case QueryType.init:
        response = await handleInitializeTutorialViewer(validated);
        break;
      case QueryType.exit:
        response = await handleExitTutorial(validated);
        break;
      case QueryType.requestStep:
        response = await handleRequestStep(validated);
        break;
      case QueryType.setStepIndex:
        response = await handleSetStep(validated);
        break;
      case QueryType.resumeTutorial:
        response = await resumeTutorial(validated);
        break;
      default:
        response = {
          ...response,
          message: "[Background]: Unexpected message type."
        };
    }
  } else {
    response = {
      ...response,
      message: "[Background]: Invalid query."
    };
  }
  console.log("[Background]: Sending response ", response);
  return response;
}

const notifyClient = async (query: ChromeQuery) => {
  const tab = await getCurrentTab();
  if (!tab || !tab.id) {
    console.log("[Background]: Failed to reach content script, active tab not found", query);
  } else {
    console.log(`[Background]: Sending query to tab ${tab.id}`, query);
    await chrome.tabs.sendMessage(tab.id, query);
  }
}

type queryHandler = (query: ChromeQuery) => Promise<ChromeResponse>;

const handleInitializeTutorialViewer: queryHandler = async query => {
  const id: string = query.message;
  const tutorial = await tutorialsApi.retrieveTutorial({id: id});
  await chrome.storage.session.set({tutorial: tutorial, stepIndex: 0});
  await notifyClient({type: QueryType.init, message: tutorial});

  return {
    query: query,
    status: Status.ok
  }
}

const handleExitTutorial: queryHandler = async query => {
  await chrome.storage.session.clear();
  return {
    query: query,
    status: Status.ok
  }
}

const handleRequestStep: queryHandler = async query => {
  let {stepIndex, step, tutorial} = await chrome.storage.session.get(["stepIndex", "step", "tutorial"]);
  console.log(stepIndex, step, tutorial);
  if (stepIndex !== undefined && tutorial !== undefined) {
    if (step === undefined || step.id === undefined || step.index !== stepIndex) {
      step = await stepsApi.retrieveStep({id: tutorial.steps[stepIndex].id});
      await chrome.storage.session.set({step: step});
    }
    return {
      query: query,
      status: Status.ok,
      message: step
    }
  }
  return {
    query: query,
    status: Status.error,
    message: "[Background]: lost current step information."
  }
}

const handleSetStep: queryHandler = async query => {
  await chrome.storage.session.set({stepIndex: query.message});
  const {stepIndex} = await chrome.storage.session.get("stepIndex");
  return {
    query: query,
    status: Status.ok,
    message: stepIndex
  }
}

const resumeTutorial: queryHandler = async query => {
  const {tutorial} = await chrome.storage.session.get("tutorial");
  return {
    query: query,
    status: Status.ok,
    message: tutorial
  }
}
