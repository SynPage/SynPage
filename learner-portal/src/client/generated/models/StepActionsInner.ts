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
/**
 * 
 * @export
 * @interface StepActionsInner
 */
export interface StepActionsInner {
    /**
     * 
     * @type {number}
     * @memberof StepActionsInner
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof StepActionsInner
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof StepActionsInner
     */
    targetElem?: string;
    /**
     * 
     * @type {number}
     * @memberof StepActionsInner
     */
    stepId: number;
    /**
     * 
     * @type {number}
     * @memberof StepActionsInner
     */
    index: number | null;
    /**
     * 
     * @type {string}
     * @memberof StepActionsInner
     */
    mouseButton?: StepActionsInnerMouseButtonEnum;
    /**
     * 
     * @type {string}
     * @memberof StepActionsInner
     */
    mouseAction?: StepActionsInnerMouseActionEnum;
}


/**
 * @export
 */
export const StepActionsInnerMouseButtonEnum = {
    Empty: '',
    L: 'L',
    R: 'R',
    M: 'M'
} as const;
export type StepActionsInnerMouseButtonEnum = typeof StepActionsInnerMouseButtonEnum[keyof typeof StepActionsInnerMouseButtonEnum];

/**
 * @export
 */
export const StepActionsInnerMouseActionEnum = {
    Empty: '',
    Click: 'CLICK',
    Dbclick: 'DBCLICK'
} as const;
export type StepActionsInnerMouseActionEnum = typeof StepActionsInnerMouseActionEnum[keyof typeof StepActionsInnerMouseActionEnum];


/**
 * Check if a given object implements the StepActionsInner interface.
 */
export function instanceOfStepActionsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "stepId" in value;
    isInstance = isInstance && "index" in value;

    return isInstance;
}

export function StepActionsInnerFromJSON(json: any): StepActionsInner {
    return StepActionsInnerFromJSONTyped(json, false);
}

export function StepActionsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): StepActionsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'description': json['description'],
        'targetElem': !exists(json, 'target_elem') ? undefined : json['target_elem'],
        'stepId': json['step_id'],
        'index': json['index'],
        'mouseButton': !exists(json, 'mouse_button') ? undefined : json['mouse_button'],
        'mouseAction': !exists(json, 'mouse_action') ? undefined : json['mouse_action'],
    };
}

export function StepActionsInnerToJSON(value?: StepActionsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'target_elem': value.targetElem,
        'step_id': value.stepId,
        'index': value.index,
        'mouse_button': value.mouseButton,
        'mouse_action': value.mouseAction,
    };
}
