import {
  test as base,
  request,
  APIRequestContext,
  expect,
} from "@playwright/test";
import { ZodType } from "zod";

type QueryParams =
  | {
      [key: string]: string | number | boolean;
    }
  | URLSearchParams
  | string;

type RequestBody = string | Buffer | object;

type APIRequestFixture = {
  apiClient: {
    get: <T>(
      endpoint: string,
      schema?: ZodType<T>,
      queryParams?: QueryParams
    ) => Promise<T>;
    post: <T>(
      endpoint: string,
      schema?: ZodType<T>,
      body?: string | Buffer | object
    ) => Promise<T>;
  };
};

const test = base.extend<APIRequestFixture>({
  apiClient: async ({}, use) => {
    const requestContext: APIRequestContext = await request.newContext({
      baseURL: "https://reqres.in",
    });
    const apiClient = {
      async get<T>(
        endpoint: string,
        schema?: ZodType<T>,
        queryParams?: QueryParams
      ): Promise<T> {
        const apiResponse = await requestContext.get(endpoint, {
          params: queryParams,
        });
        if (!apiResponse.ok()) {
          throw new Error(`Request failed with status ${apiResponse.status()}`);
        }
        const responseData = await apiResponse.json();
        try {
          return schema?.parse(responseData) as T;
        } catch (error) {
          throw new Error(`Schema validation faild with error ${error}`);
        }
      },

      async post<T>(
        endpoint: string,
        schema?: ZodType<T>,
        body?: RequestBody
      ): Promise<T> {
        const apiResponse = await requestContext.post(endpoint, { data: body });
        if (!apiResponse.ok()) {
          throw new Error(`Request failed with status ${apiResponse.status()}`);
        }
        const responseData = await apiResponse.json();
        try {
          return schema?.parse(responseData) as T;
        } catch (error) {
          throw new Error(`Schema validation faild with error ${error}`);
        }
      },
    };
    await use(apiClient);
    await requestContext.dispose();
  },
});

export { test, expect };
