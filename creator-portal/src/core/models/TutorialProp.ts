import {Tutorial} from "./Tutorial";
import {TutorialStepProp} from "./TutorialStepProp";

export interface TutorialProp extends Tutorial{
    steps: TutorialStepProp[]
}