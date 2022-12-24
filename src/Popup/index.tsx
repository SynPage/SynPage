import React, {createContext, useEffect, useState} from 'react';
import {Header} from "./Header";
import {TutorialList} from "./TutorialList";
import {Loading} from "../shared/Loading";
import {Error} from "../shared/Error";
import {ActionsApi, StepsApi, TutorialMetadata, TutorialsApi} from "../client/generated";
import {ChromeClient} from "../chrome/client";
import {ChromeQuery, QueryType} from "../chrome/query";
import {ChromeResponse, Status, validateResponse} from "../chrome/response";

export interface PopupProps {
  chromeClient: ChromeClient,
  tutorialsApi: TutorialsApi,
  stepsApi: StepsApi,
  actionsApi: ActionsApi
}

interface Context {
  chromeClient: ChromeClient
  tutorialsApi: TutorialsApi
  stepsApi: StepsApi
  actionsApi: ActionsApi
}

export const ClientContext = createContext<Context>(
  {
    chromeClient: {
      sendQuery: async query => {
        return {
          query: query,
          status: Status.error,
        };
      },
      listen: (onSuccess, onError) => {
      }
    },
    tutorialsApi: new TutorialsApi(),
    stepsApi: new StepsApi(),
    actionsApi: new ActionsApi()
  }
);

export const Popup = (props: PopupProps) => {
  const {chromeClient, tutorialsApi, stepsApi, actionsApi} = props;
  const [list, setList] = useState<TutorialMetadata[]>([]);
  const [loading, setLoading] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    chromeClient.listen(handleChromeMessage, handleChromeError);

    setLoading("Loading...");
    tutorialsApi.listTutorials().then(value => {
      setLoading(undefined);
      if (!value.data.results) {
        setError("Failed to get tutorials for site.");
      } else {
        setList(value.data.results);
      }
    }, reason => {
      setLoading(undefined)
      setError(reason.message ?? "Unknown error.");
    });
  }, []);

  const handleChromeMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
    let response: ChromeResponse = {
      query: query,
      status: Status.error,
    }

    switch (query.type) {
      default:
        const error = "Unexpected query type."
        setError(error)
        response = {
          ...response,
          status: Status.error,
          message: error
        }
    }
    return response;
  }

  const handleChromeError = async (query: ChromeQuery, message: string): Promise<ChromeResponse> => {
    setError(message);
    return {
      query: query,
      status: Status.error,
      message: message
    }
  }

  const handleTutorialSelection = (tutorial: TutorialMetadata) => {
    if (!tutorial.id) {
      setError("Tutorial does not exist.");
      return;
    }
    setLoading("Loading...");
    tutorialsApi.retrieveTutorial(tutorial.id.toString()).then(response => {
      chromeClient.sendQuery({type: QueryType.tutorialInit, message: response.data}).then(chromeResponse => {
        setLoading(undefined)
        const {valid, validated} = validateResponse(chromeResponse);
        if (!valid) {
          console.log(chromeResponse);
          setError("Received unexpected response.");
        }
        if (chromeResponse.status !== Status.ok) {
          setError(validated.message ?? "Unknown error.");
        }
      }, reason => {
        setLoading(undefined);
        setError(reason.message ?? "Unknown error.");
      });
    }, reason => {
      setLoading(undefined);
      setError(reason.message ?? "Unknown error.");
    });
  }

  return (
    <ClientContext.Provider value={{
      chromeClient: chromeClient,
      tutorialsApi: tutorialsApi,
      stepsApi: stepsApi,
      actionsApi: actionsApi
    }}>
      <Header/>
      <Loading loading={loading}/>
      <Error error={error}/>
      <TutorialList tutorials={list} onTutorialSelection={handleTutorialSelection}/>
    </ClientContext.Provider>
  );
};