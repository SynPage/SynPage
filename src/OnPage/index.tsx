import {useEffect, useState} from "react";
import {TutorialBrief} from "../generated";
import {TutorialViewer} from "./TutorialViewer";

export const OnPage = () => {
  const [tutorial, setTutorial] = useState<TutorialBrief | undefined>(undefined);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      handleMessage(message);
    });
  }, []);

  const handleMessage = (message: TutorialBrief) => {
    // TODO: Validation
    setTutorial(message);
  }

  const handleExitTutorial = () => {

  }

  return (
    <div>
      {tutorial && <TutorialViewer tutorial={tutorial} onExitTutorial={handleExitTutorial}/>}
    </div>
  );
};