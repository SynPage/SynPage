/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { StepCreation } from './StepCreation';
import {
    StepCreationFromJSON,
    StepCreationFromJSONTyped,
    StepCreationToJSON,
} from './StepCreation';

/**
 * 
 * @export
 * @interface TutorialCreation
 */
export interface TutorialCreation {
    /**
     * 
     * @type {string}
     * @memberof TutorialCreation
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof TutorialCreation
     */
    description?: string;
    /**
     * 
     * @type {Array<StepCreation>}
     * @memberof TutorialCreation
     */
    steps: Array<StepCreation>;
}

/**
 * Check if a given object implements the TutorialCreation interface.
 */
export function instanceOfTutorialCreation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "steps" in value;

    return isInstance;
}

export function TutorialCreationFromJSON(json: any): TutorialCreation {
    return TutorialCreationFromJSONTyped(json, false);
}

export function TutorialCreationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TutorialCreation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'steps': ((json['steps'] as Array<any>).map(StepCreationFromJSON)),
    };
}

export function TutorialCreationToJSON(value?: TutorialCreation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'steps': ((value.steps as Array<any>).map(StepCreationToJSON)),
    };
}

