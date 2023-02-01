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
import type { TutorialMetadata } from './TutorialMetadata';
import {
    TutorialMetadataFromJSON,
    TutorialMetadataFromJSONTyped,
    TutorialMetadataToJSON,
} from './TutorialMetadata';

/**
 * 
 * @export
 * @interface ListTutorials200Response
 */
export interface ListTutorials200Response {
    /**
     * 
     * @type {number}
     * @memberof ListTutorials200Response
     */
    count?: number;
    /**
     * 
     * @type {string}
     * @memberof ListTutorials200Response
     */
    next?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ListTutorials200Response
     */
    previous?: string | null;
    /**
     * 
     * @type {Array<TutorialMetadata>}
     * @memberof ListTutorials200Response
     */
    results?: Array<TutorialMetadata>;
}

/**
 * Check if a given object implements the ListTutorials200Response interface.
 */
export function instanceOfListTutorials200Response(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ListTutorials200ResponseFromJSON(json: any): ListTutorials200Response {
    return ListTutorials200ResponseFromJSONTyped(json, false);
}

export function ListTutorials200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListTutorials200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'next': !exists(json, 'next') ? undefined : json['next'],
        'previous': !exists(json, 'previous') ? undefined : json['previous'],
        'results': !exists(json, 'results') ? undefined : ((json['results'] as Array<any>).map(TutorialMetadataFromJSON)),
    };
}

export function ListTutorials200ResponseToJSON(value?: ListTutorials200Response | null): any {
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
        'results': value.results === undefined ? undefined : ((value.results as Array<any>).map(TutorialMetadataToJSON)),
    };
}
