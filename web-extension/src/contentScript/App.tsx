import React from "react";
import {TutorialProp} from "../core/models/TutorialProp"
import { TutorialComponent } from "../core/components/TutorialComponent";
import _tutorialDemo from "./tutorialDemo.json";

export const App = () => {
    let tutorialDemo = _tutorialDemo as unknown as TutorialProp;
    console.log(tutorialDemo);
    return <TutorialComponent tutorial={tutorialDemo}></TutorialComponent>;
}