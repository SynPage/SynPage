import {createContext, useEffect, useState} from "react";
import {TutorialBrief} from "../client/generated";
import {TutorialViewer} from "./TutorialViewer";
import {OnPageClient} from "../chrome/onPageClient";
import {ChromeResponse, Status} from "../chrome/response";
import {ChromeQuery, QueryType} from "../chrome/query";

export interface OnPageProps {
  chromeClient: OnPageClient
}

export const ClientContext = createContext<{ chromeClient: OnPageClient }>(
  {
    chromeClient: {
      async query(query: ChromeQuery): Promise<ChromeResponse> {
        return {
          query: query,
          status: Status.ok,
        };
      },
      listen(
        onSuccess: (query: ChromeQuery) => Promise<ChromeResponse>,
        onError: (query: ChromeQuery, message: string) => Promise<ChromeResponse>): void {
      }
    }
  }
);

export const OnPage = (props: OnPageProps) => {
  const {chromeClient} = props;
  const [tutorial, setTutorial] = useState<TutorialBrief | undefined>(undefined);

  useEffect(() => {
    chromeClient.listen(handleChromeMessage, handleChromeError);
    chromeClient.query({type: QueryType.resumeTutorial}).then(chromeResponse => {
      if (chromeResponse.status === Status.ok && chromeResponse.message !== undefined) {
        setTutorial(chromeResponse.message);
      }
    });
  }, []);

  const handleChromeMessage = async (query: ChromeQuery): Promise<ChromeResponse> => {
    let response: ChromeResponse = {
      query: query,
      status: Status.error,
    }

    switch (query.type) {
      case QueryType.init:
        setTutorial(query.message);
        response = {
          ...response,
          status: Status.ok,
        }
        break;
      default:
        response = {
          ...response,
          status: Status.error,
          message: "[Content]: Unexpected query type."
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
    chromeClient.query({type: QueryType.exit}).then(value => {
      console.log("[Content]: Exited tutorial.");
      setTutorial(undefined);
    }, reason => {
      console.log("[Content]: Exited tutorial but an error occurred.", reason.message);
      setTutorial(undefined);
    });
  }

  return (
    <ClientContext.Provider value={{chromeClient: chromeClient}}>
      {tutorial && <TutorialViewer tutorial={tutorial} onExitTutorial={handleExitTutorial}/>}
    </ClientContext.Provider>
  );
};