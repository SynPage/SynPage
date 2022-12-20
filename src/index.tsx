import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Popup';
import {Provider} from "react-redux";
import {store} from "./reducers/store";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Popup/>
  </Provider>
);
