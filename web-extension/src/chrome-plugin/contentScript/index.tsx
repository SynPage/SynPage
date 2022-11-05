import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

document.body.style.backgroundColor = 'orange';

const body = document.querySelector('body')
const app = document.createElement('div')
app.id = 'extension-root'

if (body) {
    body.append(app)
}

const container = document.getElementById('extension-root');
const root = ReactDOM.createRoot(container!);

root.render(<App />)


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
