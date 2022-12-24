import React from 'react';
import ReactDOM from 'react-dom/client';
import {Popup} from './Popup';
import './index.css';
import {actionsApi, stepsApi, tutorialsApi} from "./client";
import {ChromeClient} from "./chrome/client";
import {validateQuery} from "./chrome/query";
import {getCurrentTab} from "./chrome/utils";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const chromeClient: ChromeClient = {
  sendQuery: async query => {
    const tab = await getCurrentTab();
    if (!tab || !tab.id) {
      throw new Error("Failed to get active tab.");
    }
    return await chrome.tabs.sendMessage(tab.id, query);
  },
  listen: (onSuccess, onError) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const {valid, validated} = validateQuery(message);
      if (!valid) {
        onError(validated,"Received unexpected message.").then(sendResponse);
      } else {
        onSuccess(validated).then(sendResponse);
      }
    });
  }
}

root.render(
  <Popup tutorialsApi={tutorialsApi} stepsApi={stepsApi} actionsApi={actionsApi} chromeClient={chromeClient}/>
);
