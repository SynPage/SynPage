import {TutorialStep} from "./TutorialStep";

export interface Tutorial {
    id: string;
    name: string;
    targetSite: string;
    steps: TutorialStep[];
}