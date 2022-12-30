import React from 'react';
import ReactDOM from 'react-dom/client';
import {Popup} from '../Popup';
import './popup.css';
import {actionsApi, stepsApi, tutorialsApi} from "../client";
import popupClient from "./popupClient";

const root = ReactDOM.createRoot(
  (document.getElementById('root') as HTMLElement)
);

root.render(
  <Popup tutorialsApi={tutorialsApi} stepsApi={stepsApi} actionsApi={actionsApi} chromeClient={popupClient}/>
);
