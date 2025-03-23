import {
  test as base,
  request,
  APIRequestContext,
  APIResponse,
  expect,
} from "@playwright/test";

type QueryParams =
  | {
      [key: string]: string | number | boolean;
    }
  | URLSearchParams
  | string;

type RequestBody = string | Buffer | object;

type APIRequestFixture = {
  apiClient: {
    get: (endpoint: string, queryParams?: QueryParams) => Promise<APIResponse>;
    post: (endpoint: string, body?: RequestBody) => Promise<APIResponse>;
  };
};

const test = base.extend<APIRequestFixture>({
  apiClient: async ({}, use) => {
    const requestContext: APIRequestContext = await request.newContext({
      baseURL: "https://reqres.in",
    });
    const apiClient = {
      async get(
        endpoint: string,
        queryParams?: QueryParams
      ): Promise<APIResponse> {
        return await requestContext.get(endpoint, { params: queryParams });
      },

      async post(endpoint: string, body?: RequestBody): Promise<APIResponse> {
        return await requestContext.post(endpoint, { data: body });
      },
    };
    await use(apiClient);
    await requestContext.dispose();
  },
});

export { test, expect };
