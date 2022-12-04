import React from "react"
import {Provider} from "react-redux";
import {store} from "../src/reducers/store";

const customViewports = {
  popup: {
    name: 'Popup',
    styles: {
      width: '300px',
      height: '400px',
    },
  },
  onPage: {
    name: 'OnPage',
    styles: {
      width: '1920px',
      height: '900px',
    },
  },
  sidePanel: {
    name: 'SidePanel',
    styles: {
      width: '250px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports,
  },
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <Story/>
    </Provider>
  )
]
