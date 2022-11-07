import {TutorialStep} from "./TutorialStep";

export interface TutorialStepProp extends TutorialStep{
    nextStep?: () => void;
    prevStep?: () => void;
    canNextStep?: () => boolean;
    canPrevStep?: () => boolean;
}