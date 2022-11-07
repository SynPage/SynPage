import {TutorialBox} from './TutorialBox'

export interface TutorialStep {
    index: number,
    stepName: string
    components: TutorialBox[];
}