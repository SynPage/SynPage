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
/**
 * 
 * @export
 * @interface Group
 */
export interface Group {
    /**
     * 
     * @type {string}
     * @memberof Group
     */
    readonly url: string;
    /**
     * 
     * @type {string}
     * @memberof Group
     */
    name: string;
}

/**
 * Check if a given object implements the Group interface.
 */
export function instanceOfGroup(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function GroupFromJSON(json: any): Group {
    return GroupFromJSONTyped(json, false);
}

export function GroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): Group {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'name': json['name'],
    };
}

export function GroupToJSON(value?: Group | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
    };
}

