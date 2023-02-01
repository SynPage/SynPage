import {createContext, useEffect, useState} from "react";
import {OnPageClient} from "../chrome/onPageClient";
import {App} from "./App";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "./store/hooks";
import {store} from "./store";

export interface OnPageProps {
  chromeClient: OnPageClient
}

export const OnPage = (props: OnPageProps) => {
  return (
    <Provider store={store}>
      <App {...props}/>
    </Provider>
  );
};
