/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { StepActionsInner } from './StepActionsInner';
import {
    StepActionsInnerFromJSON,
    StepActionsInnerFromJSONTyped,
    StepActionsInnerToJSON,
} from './StepActionsInner';

/**
 * 
 * @export
 * @interface Step
 */
export interface Step {
    /**
     * 
     * @type {number}
     * @memberof Step
     */
    index: number;
    /**
     * 
     * @type {string}
     * @memberof Step
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof Step
     */
    description?: string;
    /**
     * 
     * @type {Array<StepActionsInner>}
     * @memberof Step
     */
    readonly actions?: Array<StepActionsInner>;
}

/**
 * Check if a given object implements the Step interface.
 */
export function instanceOfStep(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "index" in value;
    isInstance = isInstance && "title" in value;

    return isInstance;
}

export function StepFromJSON(json: any): Step {
    return StepFromJSONTyped(json, false);
}

export function StepFromJSONTyped(json: any, ignoreDiscriminator: boolean): Step {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'index': json['index'],
        'title': json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'actions': !exists(json, 'actions') ? undefined : ((json['actions'] as Array<any>).map(StepActionsInnerFromJSON)),
    };
}

export function StepToJSON(value?: Step | null): any {
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
    };
}
