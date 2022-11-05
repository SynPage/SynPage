import PopperProp from './PopperProp'

export default interface TutorialStepProp {
    id: String;
    popperConfigs: PopperProp[];
    nextStep?: () => void;
    prevStep?: () => void;
    canNextStep?: () => boolean;
    canPrevStep?: () => boolean;
}