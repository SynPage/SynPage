import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./reducers/hooks";
import {LoadTutorialListForSite} from "./reducers/TutorialControllerSlice";
import {Header} from "./components/Header";
import {TutorialList} from "./components/TutorialList";

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
