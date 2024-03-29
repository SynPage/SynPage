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


import * as runtime from '../runtime';
import type {
  ListRecommendations200Response,
  Recommendation,
} from '../models';
import {
    ListRecommendations200ResponseFromJSON,
    ListRecommendations200ResponseToJSON,
    RecommendationFromJSON,
    RecommendationToJSON,
} from '../models';

export interface CreateRecommendationRequest {
    recommendation?: Recommendation;
}

export interface DestroyRecommendationRequest {
    id: string;
}

export interface ListRecommendationsRequest {
    page?: number;
}

export interface PartialUpdateRecommendationRequest {
    id: string;
    recommendation?: Recommendation;
}

export interface RetrieveRecommendationRequest {
    id: string;
}

export interface UpdateRecommendationRequest {
    id: string;
    recommendation?: Recommendation;
}

/**
 * 
 */
export class RecommendationsApi extends runtime.BaseAPI {

    /**
     * 
     */
    async createRecommendationRaw(requestParameters: CreateRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Recommendation>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/recommendations/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RecommendationToJSON(requestParameters.recommendation),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RecommendationFromJSON(jsonValue));
    }

    /**
     * 
     */
    async createRecommendation(requestParameters: CreateRecommendationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Recommendation> {
        const response = await this.createRecommendationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     */
    async destroyRecommendationRaw(requestParameters: DestroyRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling destroyRecommendation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/recommendations/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * 
     */
    async destroyRecommendation(requestParameters: DestroyRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.destroyRecommendationRaw(requestParameters, initOverrides);
    }

    /**
     * 
     */
    async listRecommendationsRaw(requestParameters: ListRecommendationsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListRecommendations200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/recommendations/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListRecommendations200ResponseFromJSON(jsonValue));
    }

    /**
     * 
     */
    async listRecommendations(requestParameters: ListRecommendationsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListRecommendations200Response> {
        const response = await this.listRecommendationsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     */
    async partialUpdateRecommendationRaw(requestParameters: PartialUpdateRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Recommendation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling partialUpdateRecommendation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/recommendations/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: RecommendationToJSON(requestParameters.recommendation),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RecommendationFromJSON(jsonValue));
    }

    /**
     * 
     */
    async partialUpdateRecommendation(requestParameters: PartialUpdateRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Recommendation> {
        const response = await this.partialUpdateRecommendationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     */
    async retrieveRecommendationRaw(requestParameters: RetrieveRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Recommendation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieveRecommendation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/recommendations/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RecommendationFromJSON(jsonValue));
    }

    /**
     * 
     */
    async retrieveRecommendation(requestParameters: RetrieveRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Recommendation> {
        const response = await this.retrieveRecommendationRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 
     */
    async updateRecommendationRaw(requestParameters: UpdateRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Recommendation>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateRecommendation.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/recommendations/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RecommendationToJSON(requestParameters.recommendation),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RecommendationFromJSON(jsonValue));
    }

    /**
     * 
     */
    async updateRecommendation(requestParameters: UpdateRecommendationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Recommendation> {
        const response = await this.updateRecommendationRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
