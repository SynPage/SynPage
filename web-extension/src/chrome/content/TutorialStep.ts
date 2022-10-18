import { PopperConfig } from './PopperConfig'

export interface TutorialStep {
    id: String;
    popperConfigs: PopperConfig[];
    nextStep?: () => void;
    prevStep?: () => void;
    canNextStep?: () => boolean;
    canPrevStep?: () => boolean;
}