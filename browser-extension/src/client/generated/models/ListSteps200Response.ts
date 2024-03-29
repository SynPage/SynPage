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
import type { StepInfo } from './StepInfo';
import {
    StepInfoFromJSON,
    StepInfoFromJSONTyped,
    StepInfoToJSON,
} from './StepInfo';

/**
 * 
 * @export
 * @interface ListSteps200Response
 */
export interface ListSteps200Response {
    /**
     * 
     * @type {number}
     * @memberof ListSteps200Response
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof ListSteps200Response
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ListSteps200Response
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<StepInfo>}
     * @memberof ListSteps200Response
     */
    results?: Array<StepInfo>;
}

/**
 * Check if a given object implements the ListSteps200Response interface.
 */
export function instanceOfListSteps200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ListSteps200ResponseFromJSON(json: any): ListSteps200Response {
    return ListSteps200ResponseFromJSONTyped(json, false);
}

export function ListSteps200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListSteps200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(StepInfoFromJSON)),
    };
}

export function ListSteps200ResponseToJSON(value?: ListSteps200Response | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(StepInfoToJSON)),
    };
}

