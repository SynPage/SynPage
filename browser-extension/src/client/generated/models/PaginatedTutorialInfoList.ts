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
import type { TutorialInfo } from './TutorialInfo';
import {
    TutorialInfoFromJSON,
    TutorialInfoFromJSONTyped,
    TutorialInfoToJSON,
} from './TutorialInfo';

/**
 * 
 * @export
 * @interface PaginatedTutorialInfoList
 */
export interface PaginatedTutorialInfoList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedTutorialInfoList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedTutorialInfoList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedTutorialInfoList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<TutorialInfo>}
     * @memberof PaginatedTutorialInfoList
     */
    results?: Array<TutorialInfo>;
}

/**
 * Check if a given object implements the PaginatedTutorialInfoList interface.
 */
export function instanceOfPaginatedTutorialInfoList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedTutorialInfoListFromJSON(json: any): PaginatedTutorialInfoList {
    return PaginatedTutorialInfoListFromJSONTyped(json, false);
}

export function PaginatedTutorialInfoListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedTutorialInfoList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(TutorialInfoFromJSON)),
    };
}

export function PaginatedTutorialInfoListToJSON(value?: PaginatedTutorialInfoList | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(TutorialInfoToJSON)),
    };
}

