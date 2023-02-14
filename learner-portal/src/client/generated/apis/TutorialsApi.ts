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
  ListTutorials200Response,
  Tutorial,
} from '../models';
import {
    ListTutorials200ResponseFromJSON,
    ListTutorials200ResponseToJSON,
    TutorialFromJSON,
    TutorialToJSON,
} from '../models';

export interface CreateTutorialRequest {
    tutorial?: Tutorial;
}

export interface DestroyTutorialRequest {
    id: string;
    search?: string;
}

export interface ListTutorialsRequest {
    page?: number;
    search?: string;
}

export interface PartialUpdateTutorialRequest {
    id: string;
    search?: string;
    tutorial?: Tutorial;
}

export interface RetrieveTutorialRequest {
    id: string;
    search?: string;
}

export interface UpdateTutorialRequest {
    id: string;
    search?: string;
    tutorial?: Tutorial;
}

/**
 * 
 */
export class TutorialsApi extends runtime.BaseAPI {

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async createTutorialRaw(requestParameters: CreateTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tutorial>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tutorials/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: TutorialToJSON(requestParameters.tutorial),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TutorialFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async createTutorial(requestParameters: CreateTutorialRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tutorial> {
        const response = await this.createTutorialRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async destroyTutorialRaw(requestParameters: DestroyTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling destroyTutorial.');
        }

        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['search'] = requestParameters.search;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tutorials/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async destroyTutorial(requestParameters: DestroyTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.destroyTutorialRaw(requestParameters, initOverrides);
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async listTutorialsRaw(requestParameters: ListTutorialsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListTutorials200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        if (requestParameters.search !== undefined) {
            queryParameters['search'] = requestParameters.search;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tutorials/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListTutorials200ResponseFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async listTutorials(requestParameters: ListTutorialsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListTutorials200Response> {
        const response = await this.listTutorialsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async partialUpdateTutorialRaw(requestParameters: PartialUpdateTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tutorial>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling partialUpdateTutorial.');
        }

        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['search'] = requestParameters.search;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tutorials/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: TutorialToJSON(requestParameters.tutorial),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TutorialFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async partialUpdateTutorial(requestParameters: PartialUpdateTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tutorial> {
        const response = await this.partialUpdateTutorialRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async retrieveTutorialRaw(requestParameters: RetrieveTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tutorial>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieveTutorial.');
        }

        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['search'] = requestParameters.search;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/tutorials/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TutorialFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async retrieveTutorial(requestParameters: RetrieveTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tutorial> {
        const response = await this.retrieveTutorialRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async updateTutorialRaw(requestParameters: UpdateTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Tutorial>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateTutorial.');
        }

        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['search'] = requestParameters.search;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/tutorials/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: TutorialToJSON(requestParameters.tutorial),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => TutorialFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async updateTutorial(requestParameters: UpdateTutorialRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Tutorial> {
        const response = await this.updateTutorialRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
