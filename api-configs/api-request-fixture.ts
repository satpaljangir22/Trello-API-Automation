import {
  test as base,
  request,
  APIRequestContext,
  expect,
} from "@playwright/test";
import { ZodType, ZodError } from "zod";
import {
  schemaValidatedResponse,
  handleApiError,
} from "../api-utility/utility";

type QueryParams =
  | {
      [key: string]: string | number | boolean;
    }
  | URLSearchParams
  | string;

type RequestBody = string | Buffer | object;

//Type alias for API Client Fixture
type APIRequestFixture = {
  apiClient: {
    get: <T>(
      endpoint: string,
      schema: ZodType<T>,
      queryParams?: QueryParams
    ) => Promise<T>;
    post: <T>(
      endpoint: string,
      schema: ZodType<T>,
      body?: RequestBody
    ) => Promise<T>;
  };
  put: <T>(
    endpoint: string,
    schema: ZodType<T>,
    body?: RequestBody
  ) => Promise<T>;
};

const test = base.extend<APIRequestFixture>({
  apiClient: async ({}, use) => {
    const requestContext: APIRequestContext = await request.newContext({
      baseURL: "https://reqres.in",
    });

    const apiClient = {
      async get<T>(
        endpoint: string,
        schema: ZodType<T>,
        queryParams?: QueryParams
      ): Promise<T> {
        console.log(`GET Request to ${endpoint}`);
        const apiResponse = await requestContext.get(endpoint, {
          params: queryParams,
        });
        handleApiError(apiResponse);
        const responseData = await apiResponse.json();
        console.log(`Response from ${endpoint}: `, responseData);
        return schemaValidatedResponse(schema, responseData);
      },

      async post<T>(
        endpoint: string,
        schema: ZodType<T>,
        body?: RequestBody
      ): Promise<T> {
        console.log(`POST Request to ${endpoint}`);
        const apiResponse = await requestContext.post(endpoint, { data: body });
        handleApiError(apiResponse);
        const responseData = await apiResponse.json();
        console.log(`Response from ${endpoint}: `, responseData);
        return schemaValidatedResponse(schema, responseData);
      },
    };
    await use(apiClient);
    await requestContext.dispose();
  },
});

export { test, expect };
