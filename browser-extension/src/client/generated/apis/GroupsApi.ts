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
  Group,
  ListGroups200Response,
} from '../models';
import {
    GroupFromJSON,
    GroupToJSON,
    ListGroups200ResponseFromJSON,
    ListGroups200ResponseToJSON,
} from '../models';

export interface CreateGroupRequest {
    group?: Group;
}

export interface DestroyGroupRequest {
    id: string;
}

export interface ListGroupsRequest {
    page?: number;
}

export interface PartialUpdateGroupRequest {
    id: string;
    group?: Group;
}

export interface RetrieveGroupRequest {
    id: string;
}

export interface UpdateGroupRequest {
    id: string;
    group?: Group;
}

/**
 * 
 */
export class GroupsApi extends runtime.BaseAPI {

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async createGroupRaw(requestParameters: CreateGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/groups/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GroupToJSON(requestParameters.group),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async createGroup(requestParameters: CreateGroupRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.createGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async destroyGroupRaw(requestParameters: DestroyGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling destroyGroup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async destroyGroup(requestParameters: DestroyGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.destroyGroupRaw(requestParameters, initOverrides);
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async listGroupsRaw(requestParameters: ListGroupsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListGroups200Response>> {
        const queryParameters: any = {};

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListGroups200ResponseFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async listGroups(requestParameters: ListGroupsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListGroups200Response> {
        const response = await this.listGroupsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async partialUpdateGroupRaw(requestParameters: PartialUpdateGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling partialUpdateGroup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/groups/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: GroupToJSON(requestParameters.group),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async partialUpdateGroup(requestParameters: PartialUpdateGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.partialUpdateGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async retrieveGroupRaw(requestParameters: RetrieveGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling retrieveGroup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/groups/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async retrieveGroup(requestParameters: RetrieveGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.retrieveGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async updateGroupRaw(requestParameters: UpdateGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Group>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateGroup.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/groups/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: GroupToJSON(requestParameters.group),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GroupFromJSON(jsonValue));
    }

    /**
     * API endpoint that allows groups to be viewed or edited.
     */
    async updateGroup(requestParameters: UpdateGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Group> {
        const response = await this.updateGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
