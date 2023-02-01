import React from 'react';
import ReactDOM from 'react-dom/client';
import {actionsApi, stepsApi, tutorialsApi} from "./client";
import {PopupClient} from "./chrome/popupClient";
import {Popup} from "./Popup";

const root = ReactDOM.createRoot(
  (document.getElementById('root') as HTMLElement)
);

const popupClient = new PopupClient();

root.render(
  <Popup tutorialsApi={tutorialsApi} stepsApi={stepsApi} actionsApi={actionsApi} chromeClient={popupClient}/>
);
