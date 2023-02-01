import React from "react";
import ReactDOM from "react-dom/client";
import {OnPage} from "./OnPage";
import {OnPageClient} from "./chrome/onPageClient";

// document.body.style.backgroundColor = 'orange';

const body = document.querySelector('body');
const extensionRoot = document.createElement('div');
extensionRoot.id = 'synpage-root';

if (body) {
  body.append(extensionRoot)
}

const root = ReactDOM.createRoot(extensionRoot);
const onPageClient = new OnPageClient();
root.render(<OnPage chromeClient={onPageClient}/>);
