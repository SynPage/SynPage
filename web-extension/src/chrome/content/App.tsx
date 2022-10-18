import React from "react";
import { Tutorial } from "./Tutorial"
import { TutorialComponent } from "./TutorialComponent";
import _tutorialDemo from "./tutorialDemo.json";

export const App = () => {
    let tutorialDemo = _tutorialDemo as Tutorial;
    console.log(tutorialDemo);
    return <TutorialComponent tutorial={tutorialDemo}></TutorialComponent>;
}