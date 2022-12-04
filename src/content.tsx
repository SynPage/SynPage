import React from "react";
import ReactDOM from "react-dom/client";
import {OnPage} from "./OnPage";

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('[content.js]. Message received', {
//         message,
//         sender,
//     })
//
// });

document.body.style.backgroundColor = 'orange';

const body = document.querySelector('body');
const extensionRoot = document.createElement('div');
extensionRoot.id = 'synpage-root';

if (body) {
    body.append(extensionRoot)
}

const root = ReactDOM.createRoot(extensionRoot);

root.render(<OnPage/>)


/**
 * Fired when a message is sent from either an extension process or a content script.
 */
// chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, response) => {
//     console.log('[content.js]. Message received', {
//         message,
//         sender,
//     })

//     if (
//         sender.id === chrome.runtime.id &&
//         message.from === Sender.React &&
//         message.message === 'Hello from React') {
//         response('Hello from content.js');
//     }

//     if (
//         sender.id === chrome.runtime.id &&
//         message.from === Sender.React &&
//         message.message === "delete logo") {

//         const logo = document.getElementById('hplogo');
//         logo?.parentElement?.removeChild(logo)
//     }
// });
