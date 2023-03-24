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
import type { Action } from './Action';
import {
    ActionFromJSON,
    ActionFromJSONTyped,
    ActionToJSON,
} from './Action';

/**
 * 
 * @export
 * @interface StepCreation
 */
export interface StepCreation {
    /**
     * 
     * @type {number}
     * @memberof StepCreation
     */
    index: number;
    /**
     * 
     * @type {string}
     * @memberof StepCreation
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof StepCreation
     */
    description?: string;
    /**
     * 
     * @type {Array<Action>}
     * @memberof StepCreation
     */
    actions: Array<Action>;
}

/**
 * Check if a given object implements the StepCreation interface.
 */
export function instanceOfStepCreation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "index" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "actions" in value;

    return isInstance;
}

export function StepCreationFromJSON(json: any): StepCreation {
    return StepCreationFromJSONTyped(json, false);
}

export function StepCreationFromJSONTyped(json: any, ignoreDiscriminator: boolean): StepCreation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'index': json['index'],
        'title': json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'actions': ((json['actions'] as Array<any>).map(ActionFromJSON)),
    };
}

export function StepCreationToJSON(value?: StepCreation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'index': value.index,
        'title': value.title,
        'description': value.description,
        'actions': ((value.actions as Array<any>).map(ActionToJSON)),
    };
}

