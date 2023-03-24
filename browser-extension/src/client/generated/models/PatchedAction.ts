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
import type { TypeEnum } from './TypeEnum';
import {
    TypeEnumFromJSON,
    TypeEnumFromJSONTyped,
    TypeEnumToJSON,
} from './TypeEnum';

/**
 * 
 * @export
 * @interface PatchedAction
 */
export interface PatchedAction {
    /**
     * 
     * @type {number}
     * @memberof PatchedAction
     */
    index?: number;
    /**
     * 
     * @type {TypeEnum}
     * @memberof PatchedAction
     */
    type?: TypeEnum;
    /**
     * 
     * @type {string}
     * @memberof PatchedAction
     */
    targetElement?: string;
    /**
     * 
     * @type {string}
     * @memberof PatchedAction
     */
    extras?: string | null;
}

/**
 * Check if a given object implements the PatchedAction interface.
 */
export function instanceOfPatchedAction(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PatchedActionFromJSON(json: any): PatchedAction {
    return PatchedActionFromJSONTyped(json, false);
}

export function PatchedActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): PatchedAction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'index': !exists(json, 'index') ? undefined : json['index'],
        'type': !exists(json, 'type') ? undefined : TypeEnumFromJSON(json['type']),
        'targetElement': !exists(json, 'target_element') ? undefined : json['target_element'],
        'extras': !exists(json, 'extras') ? undefined : json['extras'],
    };
}

export function PatchedActionToJSON(value?: PatchedAction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'index': value.index,
        'type': TypeEnumToJSON(value.type),
        'target_element': value.targetElement,
        'extras': value.extras,
    };
}

