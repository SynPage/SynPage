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
 * @interface TutorialRecommendationsInner
 */
export interface TutorialRecommendationsInner {
    /**
     * 
     * @type {number}
     * @memberof TutorialRecommendationsInner
     */
    tutorialId: number;
    /**
     * 
     * @type {string}
     * @memberof TutorialRecommendationsInner
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof TutorialRecommendationsInner
     */
    description: string;
    /**
     * 
     * @type {Date}
     * @memberof TutorialRecommendationsInner
     */
    readonly createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof TutorialRecommendationsInner
     */
    readonly updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof TutorialRecommendationsInner
     */
    media: string;
    /**
     * 
     * @type {string}
     * @memberof TutorialRecommendationsInner
     */
    link: string;
}

/**
 * Check if a given object implements the TutorialRecommendationsInner interface.
 */
export function instanceOfTutorialRecommendationsInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "tutorialId" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "media" in value;
    isInstance = isInstance && "link" in value;

    return isInstance;
}

export function TutorialRecommendationsInnerFromJSON(json: any): TutorialRecommendationsInner {
    return TutorialRecommendationsInnerFromJSONTyped(json, false);
}

export function TutorialRecommendationsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): TutorialRecommendationsInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'tutorialId': json['tutorial_id'],
        'title': json['title'],
        'description': json['description'],
        'createdAt': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updatedAt': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'media': json['media'],
        'link': json['link'],
    };
}

export function TutorialRecommendationsInnerToJSON(value?: TutorialRecommendationsInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'tutorial_id': value.tutorialId,
        'title': value.title,
        'description': value.description,
        'media': value.media,
        'link': value.link,
    };
}

