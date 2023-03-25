import React, {createContext, useEffect, useState} from 'react';
import {Header} from "./components/Header";
import {TutorialList} from "./components/TutorialList";
import {Loading} from "../shared/Loading";
import {Error} from "../shared/Error";
import {ActionsApi, StepsApi, Tutorial, TutorialInfo, TutorialsApi} from "../client/generated";
import {QueryType} from "../chrome/query";
import {Status, validateResponse} from "../chrome/response";
import {PopupClient} from "../chrome/popupClient";
import "./index.css"

export interface PopupProps {
  chromeClient: PopupClient,
  tutorialsApi: TutorialsApi,
  stepsApi: StepsApi,
  actionsApi: ActionsApi
}

interface Context {
  chromeClient: PopupClient
  tutorialsApi: TutorialsApi
  stepsApi: StepsApi
  actionsApi: ActionsApi
}

export const ClientContext = createContext<Context>(
  {
    chromeClient: new PopupClient(),
    tutorialsApi: new TutorialsApi(),
    stepsApi: new StepsApi(),
    actionsApi: new ActionsApi()
  }
);

export const Popup = (props: PopupProps) => {
  const {chromeClient, tutorialsApi, stepsApi, actionsApi} = props;
  const [list, setList] = useState<TutorialInfo[]>([]);
  const [loading, setLoading] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // chromeClient.listen(handleChromeMessage, handleChromeError);
    console.log(chrome);

    setLoading("Loading...");
    tutorialsApi.tutorialsList().then(value => {
      setLoading(undefined);
      if (!value.results) {
        setError("Failed to get tutorials for site.");
      } else {
        setList(value.results);
      }
    }, reason => {
      setLoading(undefined)
      setError(reason.message ?? "Unknown error.");
    });
  }, []);

  // const handleChromeMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
  //   console.log("[Popup]: Received query", query)
  //   switch (query.type) {
  //     default:
  //       const error = "[Popup]: Unexpected query type."
  //       setError(error);
  //       return {
  //         query: query,
  //         status: Status.error,
  //         message: error
  //       }
  //   }
  // }

  // const handleChromeError = async (query: ChromeQuery, message: string): Promise<ChromeResponse> => {
  //   setError(message);
  //   return {
  //     query: query,
  //     status: Status.error,
  //     message: message
  //   }
  // }

  const handleTutorialSelection = (tutorial: TutorialInfo) => {
    if (!tutorial.id) {
      setError("Tutorial does not exist.");
      return;
    }
    setLoading("Loading...");
    console.log(`[Popup]: Notifying background of tutorial selection`, tutorial);
    chromeClient.queryBackground({type: QueryType.init, message: tutorial.id}).then(chromeResponse => {
      setLoading(undefined)
      const {valid, validated} = validateResponse(chromeResponse);
      if (!valid) {
        console.log("Received unexpected response.", chromeResponse);
        setError("Received unexpected response.");
      } else if (chromeResponse.status !== Status.ok) {
        setError(validated.message ?? "Unknown error.");
      }
    }, reason => {
      console.log("[Popup]: Error occurred when trying to reach background.");
      setLoading(undefined);
      setError(reason.message ?? "Unknown error.");
    })

    // getCurrentTab().then(tab => {
    //   chromeClient.queryBackground({type: QueryType.accessibility, message: {tabId: tab.id, locator: ""}}).then(chromeResponse => {
    //     console.log("AOM", chromeResponse);
    //     const nodeId: number = chromeResponse.message;
    //   }, reason => {
    //     console.log("[Popup]: Error occurred when trying to reach background.");
    //     setLoading(undefined);
    //     setError(reason.message ?? "Unknown error.");
    //   })
    // })
  }

  const handleSearch = (question: string) => {
    setLoading("Generating Tutorial...");
    chromeClient.queryBackground({type: QueryType.generate, message: question}).then(chromeResponse => {
      setLoading(undefined)
      const {valid, validated} = validateResponse(chromeResponse);
      if (!valid) {
        console.log("Received unexpected response.", chromeResponse);
        setError("Received unexpected response.");
      } else if (chromeResponse.status !== Status.ok) {
        setError(validated.message ?? "Unknown error.");
      }
      console.log("askAI", validated);
    }, reason => {
      console.log("[Popup]: Error occurred when trying to reach background.");
      setLoading(undefined);
      setError(reason.message ?? "Unknown error.");
    })
  }

  return (
    <ClientContext.Provider value={{
      chromeClient: chromeClient,
      tutorialsApi: tutorialsApi,
      stepsApi: stepsApi,
      actionsApi: actionsApi
    }}>
      <Header onSearch={handleSearch}/>
      <Loading loading={loading}/>
      <Error error={error}/>
      <TutorialList tutorials={list} onTutorialSelection={handleTutorialSelection}/>
    </ClientContext.Provider>
  );
};
