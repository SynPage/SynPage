import {createContext, useEffect, useState} from "react";
import {TutorialBrief} from "../client/generated";
import {TutorialViewer} from "./TutorialViewer";
import {ChromeClient} from "../chrome/client";
import {ChromeQuery, QueryType} from "../chrome/query";
import {ChromeResponse, Status} from "../chrome/response";

export interface OnPageProps {
  chromeClient: ChromeClient
}

export const ClientContext = createContext<{chromeClient: ChromeClient}>(
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
    }
  }
);

export const OnPage = (props: OnPageProps) => {
  const {chromeClient} = props;
  const [tutorial, setTutorial] = useState<TutorialBrief | undefined>(undefined);

  useEffect(() => {
    chromeClient.listen(handleChromeMessage, handleChromeError);
  }, []);

  const handleChromeMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
    let response: ChromeResponse = {
      query: query,
      status: Status.error,
    }

    switch (query.type) {
      case QueryType.tutorialInit:
        setTutorial(query.message);
        response = {
          ...response,
          status: Status.ok,
        }
        break;
      default:
        const error = "Unexpected query type."
        response = {
          ...response,
          status: Status.error,
          message: error
        }
    }
    return response;
  }

  const handleChromeError = async (query: ChromeQuery, message: string): Promise<ChromeResponse> => {
    return {
      query: query,
      status: Status.error,
      message: message
    }
  }
  const handleExitTutorial = () => {

  }

  return (
    <ClientContext.Provider value={{chromeClient: chromeClient}}>
      {tutorial && <TutorialViewer tutorial={tutorial} onExitTutorial={handleExitTutorial}/>}
    </ClientContext.Provider>
  );
};