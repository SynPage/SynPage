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
import type { Recommendation } from './Recommendation';
import {
    RecommendationFromJSON,
    RecommendationFromJSONTyped,
    RecommendationToJSON,
} from './Recommendation';

/**
 * 
 * @export
 * @interface PaginatedRecommendationList
 */
export interface PaginatedRecommendationList {
    /**
     * 
     * @type {number}
     * @memberof PaginatedRecommendationList
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof PaginatedRecommendationList
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PaginatedRecommendationList
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<Recommendation>}
     * @memberof PaginatedRecommendationList
     */
    results?: Array<Recommendation>;
}

/**
 * Check if a given object implements the PaginatedRecommendationList interface.
 */
export function instanceOfPaginatedRecommendationList(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaginatedRecommendationListFromJSON(json: any): PaginatedRecommendationList {
    return PaginatedRecommendationListFromJSONTyped(json, false);
}

export function PaginatedRecommendationListFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaginatedRecommendationList {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(RecommendationFromJSON)),
    };
}

export function PaginatedRecommendationListToJSON(value?: PaginatedRecommendationList | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(RecommendationToJSON)),
    };
}

