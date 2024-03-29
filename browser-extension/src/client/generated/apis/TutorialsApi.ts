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

import * as runtime from '../runtime'
import type {
  PaginatedTutorialInfoList,
  PatchedTutorial,
  Tutorial,
  TutorialCreation,
} from '../models'
import {
  PaginatedTutorialInfoListFromJSON,
  PaginatedTutorialInfoListToJSON,
  PatchedTutorialFromJSON,
  PatchedTutorialToJSON,
  TutorialFromJSON,
  TutorialToJSON,
  TutorialCreationFromJSON,
  TutorialCreationToJSON,
} from '../models'

export interface TutorialsCreateRequest {
  tutorialCreation: TutorialCreation
}

export interface TutorialsDestroyRequest {
  id: number
}

export interface TutorialsGenerateCreateRequest {
  question: string
}

export interface TutorialsListRequest {
  page?: number
  search?: string
}

export interface TutorialsPartialUpdateRequest {
  id: number
  patchedTutorial?: PatchedTutorial
}

export interface TutorialsRetrieveRequest {
  id: number
}

export interface TutorialsUpdateRequest {
  id: number
  tutorial: Tutorial
}

/**
 *
 */
export class TutorialsApi extends runtime.BaseAPI {
  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsCreateRaw(
    requestParameters: TutorialsCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<TutorialCreation>> {
    if (
      requestParameters.tutorialCreation === null ||
      requestParameters.tutorialCreation === undefined
    ) {
      throw new runtime.RequiredError(
        'tutorialCreation',
        'Required parameter requestParameters.tutorialCreation was null or undefined when calling tutorialsCreate.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
        body: TutorialCreationToJSON(requestParameters.tutorialCreation),
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TutorialCreationFromJSON(jsonValue),
    )
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsCreate(
    requestParameters: TutorialsCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<TutorialCreation> {
    const response = await this.tutorialsCreateRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsDestroyRaw(
    requestParameters: TutorialsDestroyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<void>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tutorialsDestroy.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'DELETE',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.VoidApiResponse(response)
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsDestroy(
    requestParameters: TutorialsDestroyRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<void> {
    await this.tutorialsDestroyRaw(requestParameters, initOverrides)
  }

  /**
   * Generate a tutorial based on a given question and return the tutorial ID as a JSON response.
   */
  async tutorialsGenerateCreateRaw(
    requestParameters: TutorialsGenerateCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Tutorial>> {
    if (
      requestParameters.question === null ||
      requestParameters.question === undefined
    ) {
      throw new runtime.RequiredError(
        'question',
        'Required parameter requestParameters.question was null or undefined when calling tutorialsGenerateCreate.',
      )
    }

    const queryParameters: any = {}

    if (requestParameters.question !== undefined) {
      queryParameters['question'] = requestParameters.question
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/generate/`,
        method: 'POST',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TutorialFromJSON(jsonValue),
    )
  }

  /**
   * Generate a tutorial based on a given question and return the tutorial ID as a JSON response.
   */
  async tutorialsGenerateCreate(
    requestParameters: TutorialsGenerateCreateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Tutorial> {
    const response = await this.tutorialsGenerateCreateRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsListRaw(
    requestParameters: TutorialsListRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<PaginatedTutorialInfoList>> {
    const queryParameters: any = {}

    if (requestParameters.page !== undefined) {
      queryParameters['page'] = requestParameters.page
    }

    if (requestParameters.search !== undefined) {
      queryParameters['search'] = requestParameters.search
    }

    const headerParameters: runtime.HTTPHeaders = {}

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/`,
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      PaginatedTutorialInfoListFromJSON(jsonValue),
    )
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsList(
    requestParameters: TutorialsListRequest = {},
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<PaginatedTutorialInfoList> {
    const response = await this.tutorialsListRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsPartialUpdateRaw(
    requestParameters: TutorialsPartialUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Tutorial>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tutorialsPartialUpdate.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PATCH',
        headers: headerParameters,
        query: queryParameters,
        body: PatchedTutorialToJSON(requestParameters.patchedTutorial),
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TutorialFromJSON(jsonValue),
    )
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsPartialUpdate(
    requestParameters: TutorialsPartialUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Tutorial> {
    const response = await this.tutorialsPartialUpdateRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsRetrieveRaw(
    requestParameters: TutorialsRetrieveRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Tutorial>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tutorialsRetrieve.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'GET',
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TutorialFromJSON(jsonValue),
    )
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsRetrieve(
    requestParameters: TutorialsRetrieveRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Tutorial> {
    const response = await this.tutorialsRetrieveRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsUpdateRaw(
    requestParameters: TutorialsUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<runtime.ApiResponse<Tutorial>> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError(
        'id',
        'Required parameter requestParameters.id was null or undefined when calling tutorialsUpdate.',
      )
    }

    if (
      requestParameters.tutorial === null ||
      requestParameters.tutorial === undefined
    ) {
      throw new runtime.RequiredError(
        'tutorial',
        'Required parameter requestParameters.tutorial was null or undefined when calling tutorialsUpdate.',
      )
    }

    const queryParameters: any = {}

    const headerParameters: runtime.HTTPHeaders = {}

    headerParameters['Content-Type'] = 'application/json'

    if (
      this.configuration &&
      (this.configuration.username !== undefined ||
        this.configuration.password !== undefined)
    ) {
      headerParameters['Authorization'] =
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
    }
    const response = await this.request(
      {
        path: `/tutorials/{id}/`.replace(
          `{${'id'}}`,
          encodeURIComponent(String(requestParameters.id)),
        ),
        method: 'PUT',
        headers: headerParameters,
        query: queryParameters,
        body: TutorialToJSON(requestParameters.tutorial),
      },
      initOverrides,
    )

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      TutorialFromJSON(jsonValue),
    )
  }

  /**
   * API endpoint that allows groups to be viewed or edited.
   */
  async tutorialsUpdate(
    requestParameters: TutorialsUpdateRequest,
    initOverrides?: RequestInit | runtime.InitOverrideFunction,
  ): Promise<Tutorial> {
    const response = await this.tutorialsUpdateRaw(
      requestParameters,
      initOverrides,
    )
    return await response.value()
  }
}
