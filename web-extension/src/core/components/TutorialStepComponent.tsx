import React from "react";
import TutorialPopperComponent from "./TutorialPopperComponent";
import {TutorialStepProp} from "../models/TutorialStepProp";

export const TutorialStepComponent = (props: { stepConfig: TutorialStepProp}) => {
    const config = props.stepConfig;

    const poppers = () => {
        return <>
            {props.stepConfig.components.map(component => {
                return <TutorialPopperComponent popperConfig={component} {...config}/>
            })}
        </>
    }

    return (
        <div>
            {poppers()}
        </div>
    )
}