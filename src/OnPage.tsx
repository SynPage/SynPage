import {useEffect, useState} from "react";
import {Tutorial} from "./generated";
import {TutorialViewer} from "./onPageComponents/TutorialViewer";

export const OnPage = () => {
  const [tutorial, setTutorial] = useState<Tutorial | undefined>(undefined);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      handleMessage(message);
    });
  }, []);

  const handleMessage = (message: any) => {
    setTutorial(message); // TODO: Message format, validate tutorial?
  }

  return (
    <div>
      {tutorial && <TutorialViewer tutorial={tutorial}/>}
    </div>
  );
};