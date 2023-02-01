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
import type { Group } from './Group';
import {
    GroupFromJSON,
    GroupFromJSONTyped,
    GroupToJSON,
} from './Group';

/**
 * 
 * @export
 * @interface ListGroups200Response
 */
export interface ListGroups200Response {
    /**
     * 
     * @type {number}
     * @memberof ListGroups200Response
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof ListGroups200Response
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ListGroups200Response
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<Group>}
     * @memberof ListGroups200Response
     */
    results?: Array<Group>;
}

/**
 * Check if a given object implements the ListGroups200Response interface.
 */
export function instanceOfListGroups200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ListGroups200ResponseFromJSON(json: any): ListGroups200Response {
    return ListGroups200ResponseFromJSONTyped(json, false);
}

export function ListGroups200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListGroups200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(GroupFromJSON)),
    };
}

export function ListGroups200ResponseToJSON(value?: ListGroups200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'next': value.next,
        'previous': value.previous,
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(GroupToJSON)),
    };
}
