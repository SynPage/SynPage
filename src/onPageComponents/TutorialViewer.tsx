import {Tutorial} from "../generated";
import {SidePanel} from "./SidePanel";
import React, {useState} from "react";
import {SidePanelStepView, SidePanelTutorialView} from "./SidePanelViews";

export interface TutorialViewerProps {
    tutorial: Tutorial;
}

export const TutorialViewer = (props: TutorialViewerProps) => {
    const {tutorial, ...others} = props;
    const [view, setView] = useState(true);

    const handleToggleView = () => {
        setView(!view);
    }

    const handleExitTutorial = () => {

    }

    return (
        <div>
            <SidePanel onToggleView={handleToggleView} onExitTutorial={handleExitTutorial}>
                {view ? <SidePanelStepView/> : <SidePanelTutorialView/>}
            </SidePanel>
        </div>
    );
}