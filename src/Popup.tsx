import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./reducers/hooks";
import {LoadTutorialListForSite} from "./reducers/TutorialControllerSlice";
import {Header} from "./popupComponents/Header";
import {TutorialList} from "./popupComponents/TutorialList";

const Popup = () => {
  const dispatch = useAppDispatch();
  const tutorial = useAppSelector(s => s.Controller.tutorial);

  useEffect(() => {
    dispatch(LoadTutorialListForSite("https://google.ca"));
  }, []);

  return (
    <div>
      <Header/>
      <TutorialList/>
    </div>
  );
}

export default Popup;
