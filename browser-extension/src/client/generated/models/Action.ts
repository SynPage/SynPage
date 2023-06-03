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
 * @interface Action
 */
export interface Action {
    /**
     * 
     * @type {number}
     * @memberof Action
     */
    index: number;
    /**
     * 
     * @type {TypeEnum}
     * @memberof Action
     */
    type?: TypeEnum;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    targetElement?: string;
    /**
     * 
     * @type {string}
     * @memberof Action
     */
    extras?: string | null;
}

/**
 * Check if a given object implements the Action interface.
 */
export function instanceOfAction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "index" in value;

    return isInstance;
}

export function ActionFromJSON(json: any): Action {
    return ActionFromJSONTyped(json, false);
}

export function ActionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Action {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'index': json['index'],
        'type': !exists(json, 'type') ? undefined : TypeEnumFromJSON(json['type']),
        'description': !exists(json, 'description') ? undefined : json['description'],
        'targetElement': !exists(json, 'target_element') ? undefined : json['target_element'],
        'extras': !exists(json, 'extras') ? undefined : json['extras'],
    };
}

export function ActionToJSON(value?: Action | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'index': value.index,
        'type': TypeEnumToJSON(value.type),
        'description': value.description,
        'target_element': value.targetElement,
        'extras': value.extras,
    };
}

